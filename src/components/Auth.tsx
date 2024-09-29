import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LiquidSDK, WebPassKeys } from "liquid-sdk";
import React, { useState } from "react";

const PasskeysAuth: React.FC = () => {
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState<`0x${string}`>("0x00000");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [buyAmount, setBuyAmount] = useState("");

  const sdk = new LiquidSDK(
    "https://mainnet.base.org",
    new WebPassKeys(),
    "http://localhost:8787",
    "fjnsvjl"
  );

  const handleRegister = async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("heree");
      const { address } = await sdk.createSmartAccount(username);
      console.log(address);
      setAddress(address);
    } catch (err) {
      console.log(err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuyCoin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (!address) {
        throw new Error("Please login first");
      }

      // const buyAction = {
      //   type: ActionType.SWAP,
      //   tokenIn: { address: "0x..." /* other token details */ },
      //   tokenOut: { address: "0x..." /* other token details */ },
      //   amountIn: BigInt(buyAmount),
      //   to: address,
      //   isStable: false,
      // };

      // const txHash = await sdk.executeStrategy(username, address, [buyAction]);
      // console.log("Transaction hash:", txHash);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Welcome
          </CardTitle>
          <CardDescription className="text-center">
            Sign in or create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="register">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleRegister();
                }}
              >
                <div className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Choose a username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Registering..." : "Register"}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        {/* {address && (
          <CardContent>
            <div className="space-y-4">
              <Input
                type="number"
                placeholder="Amount to buy"
                value={buyAmount}
                onChange={(e) => setBuyAmount(e.target.value)}
                required
              />
              <Button
                onClick={handleBuyCoin}
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Buy Coin"}
              </Button>
            </div>
          </CardContent>
        )} */}
        {error && (
          <CardFooter>
            <p className="text-sm text-destructive w-full text-center">
              {error}
            </p>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default PasskeysAuth;
