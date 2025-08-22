import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUpRight, ArrowDownLeft, RefreshCw, Plus, Minus, TrendingUp, Wallet, ArrowLeftRight } from "lucide-react";

export const WalletSection = () => {
  const currencies = [
    { code: "USD", amount: "12,450.00", usdValue: "$12,450.00", change: "+2.1%", rate: "1.0000" },
    { code: "EUR", amount: "7,890.50", usdValue: "$8,520.00", change: "+2.2%", rate: "0.9234" },
    { code: "GBP", amount: "3,200.75", usdValue: "$4,080.00", change: "+1.8%", rate: "0.7845" },
    { code: "BTC", amount: "0.24000000", usdValue: "$3,600.00", change: "-3.2%", rate: "15000.00" },
    { code: "ETH", amount: "1.45000000", usdValue: "$2,900.00", change: "+5.4%", rate: "2000.00" },
    { code: "USDT", amount: "5,000.00", usdValue: "$5,000.00", change: "+0.1%", rate: "1.0001" }
  ];

  const recentActivity = [
    { type: "deposit", amount: "+$1,250", currency: "USD", from: "Stripe", time: "2 min ago" },
    { type: "convert", amount: "-€850", currency: "EUR → USD", from: "Internal", time: "15 min ago" },
    { type: "withdraw", amount: "-0.05 BTC", currency: "BTC", from: "Crypto.com", time: "1 hour ago" },
    { type: "deposit", amount: "+$2,100", currency: "USD", from: "PayPal", time: "3 hours ago" }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Universal Wallet</h1>
        <p className="text-muted-foreground">
          Manage your multi-currency balances and conversions
        </p>
      </div>

      {/* Total Balance Card */}
      <Card className="p-6 bg-gradient-primary text-primary-foreground shadow-primary">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Wallet className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Total Portfolio Value</h2>
              <p className="text-primary-foreground/80">Across all currencies</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-white/20">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        <div className="mb-6">
          <div className="text-4xl font-bold mb-2">$31,550.00</div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-accent" />
            <span className="text-sm">+5.2% from yesterday (+$1,560)</span>
          </div>
        </div>

        <div className="flex space-x-3">
          <Button variant="secondary" className="flex-1">
            <Plus className="h-4 w-4 mr-2" />
            Add Funds
          </Button>
          <Button variant="secondary" className="flex-1">
            <Minus className="h-4 w-4 mr-2" />
            Withdraw
          </Button>
          <Button variant="secondary" className="flex-1">
            <ArrowLeftRight className="h-4 w-4 mr-2" />
            Convert
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Currency Balances */}
        <Card className="p-6 bg-gradient-card shadow-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Currency Balances</h3>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Currency
            </Button>
          </div>

          <div className="space-y-4">
            {currencies.map((currency) => (
              <div key={currency.code} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-smooth">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-secondary rounded-full flex items-center justify-center text-secondary-foreground font-bold text-sm">
                    {currency.code.slice(0, 2)}
                  </div>
                  <div>
                    <div className="font-semibold">{currency.amount} {currency.code}</div>
                    <div className="text-sm text-muted-foreground">{currency.usdValue}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-semibold ${
                    currency.change.startsWith('+') ? 'text-accent' : 'text-destructive'
                  }`}>
                    {currency.change}
                  </div>
                  <div className="text-xs text-muted-foreground">Rate: {currency.rate}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Currency Converter */}
        <Card className="p-6 bg-gradient-card shadow-card">
          <h3 className="text-lg font-semibold mb-6">Currency Converter</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="from-amount">From</Label>
              <div className="flex space-x-2">
                <Input
                  id="from-amount"
                  placeholder="0.00"
                  className="flex-1"
                  defaultValue="1000"
                />
                <Select defaultValue="usd">
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD</SelectItem>
                    <SelectItem value="eur">EUR</SelectItem>
                    <SelectItem value="gbp">GBP</SelectItem>
                    <SelectItem value="btc">BTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-center">
              <Button variant="ghost" size="sm" className="rounded-full">
                <ArrowDownLeft className="h-4 w-4 rotate-90" />
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="to-amount">To</Label>
              <div className="flex space-x-2">
                <Input
                  id="to-amount"
                  placeholder="0.00"
                  className="flex-1"
                  value="923.40"
                  readOnly
                />
                <Select defaultValue="eur">
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD</SelectItem>
                    <SelectItem value="eur">EUR</SelectItem>
                    <SelectItem value="gbp">GBP</SelectItem>
                    <SelectItem value="btc">BTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="bg-muted/50 p-3 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Exchange Rate</div>
              <div className="font-semibold">1 USD = 0.9234 EUR</div>
              <div className="text-xs text-muted-foreground">Fee: $2.50 (0.25%)</div>
            </div>

            <Button className="w-full bg-gradient-primary text-primary-foreground shadow-primary">
              Convert Now
            </Button>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6 bg-gradient-card shadow-card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Recent Activity</h3>
          <Button variant="outline" size="sm">View All</Button>
        </div>

        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activity.type === 'deposit' ? 'bg-accent/20' : 
                  activity.type === 'withdraw' ? 'bg-destructive/20' : 
                  'bg-warning/20'
                }`}>
                  {activity.type === 'deposit' ? '↓' : activity.type === 'withdraw' ? '↑' : '↔'}
                </div>
                <div>
                  <div className="font-medium">{activity.amount}</div>
                  <div className="text-sm text-muted-foreground">
                    {activity.type === 'convert' ? 'Currency conversion' : 
                     activity.type === 'deposit' ? 'Deposit' : 'Withdrawal'} • {activity.from}
                  </div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">{activity.time}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};