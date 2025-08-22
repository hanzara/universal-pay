import { useState } from "react";
import { useWallet } from "@/hooks/useWallet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Send, 
  Zap, 
  Target, 
  Clock, 
  DollarSign, 
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Repeat,
  Settings
} from "lucide-react";

const mockRouteOptions = [
  {
    id: "1",
    channel: "Wise Transfer",
    cost: "$2.50",
    time: "2-3 hours",
    successRate: "99.8%",
    aiScore: 95,
    recommended: true
  },
  {
    id: "2", 
    channel: "SWIFT Wire",
    cost: "$25.00",
    time: "1-2 days",
    successRate: "99.2%",
    aiScore: 75,
    recommended: false
  },
  {
    id: "3",
    channel: "Crypto Bridge",
    cost: "$1.20",
    time: "10-30 mins",
    successRate: "98.5%",
    aiScore: 88,
    recommended: false
  }
];

const mockRecentPayments = [
  {
    id: "TXN-001",
    recipient: "Acme Corp Ltd",
    amount: "$15,000.00",
    status: "completed",
    channel: "Wise Transfer",
    time: "2 hours ago"
  },
  {
    id: "TXN-002",
    recipient: "Global Solutions Inc",
    amount: "€8,500.00",
    status: "processing",
    channel: "SEPA Transfer",
    time: "1 hour ago"
  },
  {
    id: "TXN-003",
    recipient: "Tech Startup Ltd",
    amount: "$2,300.00",
    status: "failed",
    channel: "Wire Transfer",
    time: "3 hours ago"
  }
];

export const PaymentsSection = () => {
  const [autopilotEnabled, setAutopilotEnabled] = useState(true);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [selectedRoute, setSelectedRoute] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { wallets, transactions, sendPayment } = useWallet();

  // Use real transaction data if available
  const recentPayments = transactions.slice(0, 10).map(tx => ({
    id: tx.id,
    recipient: tx.metadata?.recipient || "Unknown Recipient",
    amount: `${tx.source_amount} ${tx.source_currency}`,
    status: tx.status,
    channel: tx.metadata?.preferred_route || "Smart Route",
    time: new Date(tx.created_at).toLocaleString()
  }));

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "processing":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "failed":
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600";
      case "processing":
        return "text-yellow-600";
      case "failed":
        return "text-red-600";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Smart Payments</h1>
        <p className="text-muted-foreground">
          AI-powered payment routing with autopilot mode and intelligent optimization
        </p>
      </div>

      <Tabs defaultValue="send" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="send">Send Payment</TabsTrigger>
          <TabsTrigger value="history">Transaction History</TabsTrigger>
          <TabsTrigger value="autopilot">Autopilot Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="send" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Payment Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  Send Payment
                </CardTitle>
                <CardDescription>
                  Enter payment details and let our AI find the optimal route
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Recipient</Label>
                  <Input 
                    placeholder="Enter recipient details (email, phone, IBAN, etc.)"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Amount</Label>
                    <Input 
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Currency</Label>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {wallets.map((wallet) => (
                          <SelectItem key={wallet.currency_code} value={wallet.currency_code}>
                            {wallet.currency_code}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Message (Optional)</Label>
                  <Textarea 
                    placeholder="Payment reference or message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Autopilot Mode</p>
                      <p className="text-sm text-muted-foreground">
                        AI will automatically select the best route
                      </p>
                    </div>
                  </div>
                  <Switch checked={autopilotEnabled} onCheckedChange={setAutopilotEnabled} />
                </div>

                {!autopilotEnabled && (
                  <div className="space-y-2">
                    <Label>Select Route Manually</Label>
                    <Select value={selectedRoute} onValueChange={setSelectedRoute}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose payment channel" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockRouteOptions.map((route) => (
                          <SelectItem key={route.id} value={route.channel}>
                            {route.channel} - {route.cost}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Route Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  AI Route Recommendations
                </CardTitle>
                <CardDescription>
                  Optimized routes based on cost, speed, and success rate
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockRouteOptions.map((route) => (
                  <div 
                    key={route.id}
                    className={`p-4 rounded-lg border transition-colors ${
                      route.recommended 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{route.channel}</h4>
                        {route.recommended && (
                          <Badge variant="default" className="text-xs">Recommended</Badge>
                        )}
                      </div>
                      <div className="text-sm font-medium text-primary">
                        AI Score: {route.aiScore}/100
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Cost</p>
                        <p className="font-medium">{route.cost}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Time</p>
                        <p className="font-medium">{route.time}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Success Rate</p>
                        <p className="font-medium">{route.successRate}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button 
                  className="w-full mt-4" 
                  disabled={!amount || !recipient || loading}
                  onClick={async () => {
                    setLoading(true);
                    try {
                      await sendPayment({
                        recipient,
                        amount: parseFloat(amount),
                        currency,
                        message,
                        route: autopilotEnabled ? undefined : selectedRoute
                      });
                      setRecipient('');
                      setAmount('');
                      setMessage('');
                    } catch (error) {
                      console.error('Payment failed:', error);
                    } finally {
                      setLoading(false);
                    }
                  }}
                >
                  {loading ? 'Processing...' : (autopilotEnabled ? 'Send with Autopilot' : 'Send Payment')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>
                Track all your payment activity and status updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {(recentPayments.length > 0 ? recentPayments : mockRecentPayments).map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    {getStatusIcon(payment.status)}
                    <div>
                      <p className="font-medium">{payment.recipient}</p>
                      <p className="text-sm text-muted-foreground">
                        {payment.id} • via {payment.channel}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{payment.amount}</p>
                    <p className={`text-sm capitalize ${getStatusColor(payment.status)}`}>
                      {payment.status}
                    </p>
                    <p className="text-xs text-muted-foreground">{payment.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="autopilot" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Autopilot Configuration
              </CardTitle>
              <CardDescription>
                Configure how AI should prioritize your payment routing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable Autopilot Mode</p>
                    <p className="text-sm text-muted-foreground">
                      Automatically route payments using AI recommendations
                    </p>
                  </div>
                  <Switch checked={autopilotEnabled} onCheckedChange={setAutopilotEnabled} />
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Priority Order</h4>
                  <p className="text-sm text-muted-foreground">
                    Drag to reorder how AI should prioritize routing factors
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        <span>Lowest Cost</span>
                      </div>
                      <Badge variant="outline">Priority 1</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        <span>Highest Success Rate</span>
                      </div>
                      <Badge variant="outline">Priority 2</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>Fastest Speed</span>
                      </div>
                      <Badge variant="outline">Priority 3</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Smart Retry Settings</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto-retry failed payments</p>
                      <p className="text-sm text-muted-foreground">
                        Automatically retry through alternative routes
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Maximum retry attempts</p>
                      <p className="text-sm text-muted-foreground">
                        How many alternative routes to try
                      </p>
                    </div>
                    <Select defaultValue="3">
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};