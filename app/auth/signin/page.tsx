"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building2 } from "lucide-react";
import { useMockAuth as useAuth } from "@/components/mock-auth-provider";
import { useToast } from "@/hooks/use-toast";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      await signIn("github", { callbackUrl: "/" });
      setLoading(true);
      toast({
        title: "Success",
        description: "You have been signed in successfully.",
      });
      router.push("/dashboard");
    } catch (e: any) {
      console.log("aoyyyy");
      toast({
        title: "Error",
        description: e.message || "Failed to sign in. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
    // try {
    //   await signIn(username, password)
    //   toast({
    //     title: "Success",
    //     description: "You have been signed in successfully.",
    //   })
    //   router.push("/dashboard")
    // } catch (error: any) {
    //   toast({
    //     title: "Error",
    //     description: error.message || "Failed to sign in. Please try again.",
    //     variant: "destructive",
    //   })
    // } finally {
    //   setLoading(false)
    // }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Building2 className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-primary">
            FocusProperty
          </CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          {/* <button onClick={handleSubmit}>sign in to github</button> */}
          <form onSubmit={handleSubmit} className="space-y-4">
          {/* <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div> */}
          <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing In..." : "Sign In To Github"}
            </Button>
          </form>


          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {"Don't have an account? "}
              <Link
                href="/auth/signup"
                className="text-primary hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
