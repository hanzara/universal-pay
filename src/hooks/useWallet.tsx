import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from '@/hooks/use-toast';

interface WalletData {
  id: string;
  currency_code: string;
  balance: number;
  available_balance: number;
  locked_balance: number;
  updated_at: string;
}

interface TransactionData {
  id: string;
  type: string;
  status: string;
  source_amount: number;
  source_currency: string;
  destination_amount?: number;
  destination_currency?: string;
  fee_amount?: number;
  fee_currency?: string;
  created_at: string;
  external_id?: string;
  metadata?: any;
}

export const useWallet = () => {
  const [wallets, setWallets] = useState<WalletData[]>([]);
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch wallets
  const fetchWallets = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', user.id)
        .order('currency_code');

      if (error) throw error;
      setWallets(data || []);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching wallets:', err);
    }
  };

  // Fetch transactions
  const fetchTransactions = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setTransactions(data || []);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching transactions:', err);
    }
  };

  // Send payment
  const sendPayment = async (payload: {
    recipient: string;
    amount: number;
    currency: string;
    message?: string;
    route?: string;
  }) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          type: 'outbound',
          status: 'pending',
          source_amount: payload.amount,
          source_currency: payload.currency,
          metadata: {
            recipient: payload.recipient,
            message: payload.message,
            preferred_route: payload.route,
          }
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Payment Initiated",
        description: `Sending ${payload.amount} ${payload.currency} to ${payload.recipient}`,
      });

      // Refresh data
      await Promise.all([fetchWallets(), fetchTransactions()]);
      
      return data;
    } catch (err: any) {
      toast({
        title: "Payment Failed",
        description: err.message,
        variant: "destructive",
      });
      throw err;
    }
  };

  // Convert currency
  const convertCurrency = async (
    fromCurrency: string,
    toCurrency: string,
    amount: number
  ) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          type: 'conversion',
          status: 'pending',
          source_amount: amount,
          source_currency: fromCurrency,
          destination_currency: toCurrency,
          metadata: {
            conversion_type: 'internal',
          }
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Currency Conversion",
        description: `Converting ${amount} ${fromCurrency} to ${toCurrency}`,
      });

      // Refresh data
      await Promise.all([fetchWallets(), fetchTransactions()]);
      
      return data;
    } catch (err: any) {
      toast({
        title: "Conversion Failed", 
        description: err.message,
        variant: "destructive",
      });
      throw err;
    }
  };

  // Calculate total portfolio value in USD
  const getTotalValue = () => {
    const rates: { [key: string]: number } = { 
      USD: 1, 
      EUR: 1.1, 
      GBP: 1.25, 
      BTC: 45000, 
      ETH: 2500 
    };
    
    return wallets.reduce((sum, wallet) => {
      return sum + (wallet.balance * (rates[wallet.currency_code] || 1));
    }, 0);
  };

  // Real-time subscriptions
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('wallet-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'wallets',
          filter: `user_id=eq.${user.id}`
        },
        () => {
          fetchWallets();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'transactions',
          filter: `user_id=eq.${user.id}`
        },
        () => {
          fetchTransactions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  // Initial data fetch
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchWallets(), fetchTransactions()]);
      setLoading(false);
    };

    if (user) {
      loadData();
    }
  }, [user]);

  return {
    wallets,
    transactions,
    loading,
    error,
    sendPayment,
    convertCurrency,
    getTotalValue,
    refreshData: () => Promise.all([fetchWallets(), fetchTransactions()]),
  };
};