"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Shield, Lock, AlertTriangle, CheckCircle, Smartphone, Key } from "lucide-react"

interface SecurityPageProps {
  onTabChange?: (tab: string) => void
}

export default function SecurityPage({ onTabChange }: SecurityPageProps) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Security Settings</h1>
      <p className="text-gray-400">Manage your account security and privacy settings</p>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-[#2a2a2a] border-[#333333] text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Security Status</CardTitle>
            <Shield className="h-5 w-5 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Good</div>
            <p className="text-xs text-gray-400">Last security check: 2 days ago</p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                  <span className="text-sm">Strong password</span>
                </div>
                <Badge className="bg-emerald-500">Secure</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                  <span className="text-sm">Two-factor authentication</span>
                </div>
                <Badge className="bg-emerald-500">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <AlertTriangle className="mr-2 h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Recent login from new device</span>
                </div>
                <Badge className="bg-yellow-500">Review</Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Run Security Check</Button>
          </CardFooter>
        </Card>

        <Card className="bg-[#2a2a2a] border-[#333333] text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Password</CardTitle>
            <Lock className="h-5 w-5 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-400">
              Your password was last changed 45 days ago. We recommend changing your password regularly.
            </p>
            <div className="mt-4 space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" className="bg-[#333333] border-[#444444] text-white" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" className="bg-[#333333] border-[#444444] text-white" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" className="bg-[#333333] border-[#444444] text-white" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Update Password</Button>
          </CardFooter>
        </Card>
      </div>

      <Card className="bg-[#2a2a2a] border-[#333333] text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Two-Factor Authentication
          </CardTitle>
          <CardDescription className="text-gray-400">Add an extra layer of security to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="font-medium">Two-Factor Authentication</h3>
              <p className="text-sm text-gray-400">Require a verification code when signing in</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="rounded-lg bg-[#333333] p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-[#444444] flex items-center justify-center">
                  <Smartphone className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <p className="font-medium">Authenticator App</p>
                  <p className="text-xs text-gray-400">Use an authenticator app to generate verification codes</p>
                </div>
              </div>
              <Badge className="bg-emerald-500">Active</Badge>
            </div>
          </div>

          <div className="rounded-lg bg-[#333333] p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-[#444444] flex items-center justify-center">
                  <Key className="h-5 w-5 text-gray-400" />
                </div>
                <div>
                  <p className="font-medium">Security Key</p>
                  <p className="text-xs text-gray-400">Use a physical security key for two-factor authentication</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="border-emerald-500 text-emerald-500">
                Set Up
              </Button>
            </div>
          </div>

          <div className="rounded-lg bg-[#333333] p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-[#444444] flex items-center justify-center">
                  <Key className="h-5 w-5 text-gray-400" />
                </div>
                <div>
                  <p className="font-medium">Recovery Codes</p>
                  <p className="text-xs text-gray-400">
                    Generate backup codes to use if you lose access to your device
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="border-emerald-500 text-emerald-500">
                View Codes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#2a2a2a] border-[#333333] text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Login Activity
          </CardTitle>
          <CardDescription className="text-gray-400">Monitor recent login attempts and active sessions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-[#333333] p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-emerald-500" />
                <div>
                  <p className="font-medium">Current Session</p>
                  <p className="text-xs text-gray-400">Chrome on macOS • New York, USA • Active now</p>
                </div>
              </div>
              <Badge className="bg-emerald-500">Current</Badge>
            </div>
          </div>

          <div className="rounded-lg bg-[#333333] p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-emerald-500" />
                <div>
                  <p className="font-medium">Mobile App</p>
                  <p className="text-xs text-gray-400">iOS • New York, USA • Last active 2 hours ago</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-400">
                Sign Out
              </Button>
            </div>
          </div>

          <div className="rounded-lg bg-[#333333] p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="font-medium">Unknown Device</p>
                  <p className="text-xs text-gray-400">Firefox on Windows • Chicago, USA • Yesterday, 8:45 PM</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="border-red-500 text-red-500">
                Report
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
            Sign Out of All Devices
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

