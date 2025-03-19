"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Shield, LogOut, Upload } from "lucide-react"

interface AccountPageProps {
  onTabChange?: (tab: string) => void
  onSignOut?: () => void
  user?: any
}

export default function AccountPage({
  onTabChange,
  onSignOut,
  user = { username: "username", email: "user@example...com" },
}: AccountPageProps) {
  const [profileImage, setProfileImage] = useState("/placeholder...svg?height=100&width=100")

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Account Settings</h1>
      <p className="text-gray-400">Manage your account settings and preferences</p>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="bg-[#2a2a2a] text-gray-400">
          <TabsTrigger value="profile" className="data-[state=active]:bg-[#333333] data-[state=active]:text-white">
            Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-[#333333] data-[state=active]:text-white">
            Security
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:bg-[#333333] data-[state=active]:text-white"
          >
            Notifications
          </TabsTrigger>
          <TabsTrigger value="connected" className="data-[state=active]:bg-[#333333] data-[state=active]:text-white">
            Connected Accounts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6 space-y-6">
          <Card className="bg-[#2a2a2a] border-[#333333] text-white">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription className="text-gray-400">
                Update your profile information and public details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Avatar className="h-24 w-24 border-2 border-emerald-500">
                  <img src={profileImage || "/placeholder...svg"} alt="Profile" />
                </Avatar>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Profile Photo</h3>
                  <p className="text-sm text-gray-400">This will be displayed on your profile and in the community</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-emerald-500 text-emerald-500">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload
                    </Button>
                    <Button variant="outline" size="sm" className="border-[#444444] text-gray-400">
                      Remove
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      defaultValue={user...username}
                      className="bg-[#333333] border-[#444444] text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="display-name">Display Name</Label>
                    <Input
                      id="display-name"
                      defaultValue={user...username}
                      className="bg-[#333333] border-[#444444] text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={user...email}
                    className="bg-[#333333] border-[#444444] text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                    id="bio"
                    rows={3}
                    placeholder="Tell others about yourself and your investment style........."
                    className="w-full rounded-md bg-[#333333] border border-[#444444] p-2 text-white"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-[#333333] pt-5">
              <Button variant="outline" className="border-[#444444] text-gray-400">
                Cancel
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700">Save Changes</Button>
            </CardFooter>
          </Card>

          <Card className="bg-[#2a2a2a] border-[#333333] text-white">
            <CardHeader>
              <CardTitle>Public Profile</CardTitle>
              <CardDescription className="text-gray-400">
                Control what information is visible to other users
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0...5">
                  <h3 className="font-medium">Profile Visibility</h3>
                  <p className="text-sm text-gray-400">Make your profile visible to other users</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0...5">
                  <h3 className="font-medium">Show Portfolio Performance</h3>
                  <p className="text-sm text-gray-400">Allow others to see your portfolio performance</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0...5">
                  <h3 className="font-medium">Show Investment History</h3>
                  <p className="text-sm text-gray-400">Allow others to see your investment history</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6 space-y-6">
          <Card className="bg-[#2a2a2a] border-[#333333] text-white">
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription className="text-gray-400">
                Change your password to keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" className="bg-[#333333] border-[#444444] text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" className="bg-[#333333] border-[#444444] text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" className="bg-[#333333] border-[#444444] text-white" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-emerald-600 hover:bg-emerald-700">Update Password</Button>
            </CardFooter>
          </Card>

          <Card className="bg-[#2a2a2a] border-[#333333] text-white">
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription className="text-gray-400">
                Add an extra layer of security to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0...5">
                  <h3 className="font-medium">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-400">Require a verification code when signing in</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="pt-2">
                <Button variant="outline" className="border-emerald-500 text-emerald-500">
                  Configure 2FA
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#2a2a2a] border-[#333333] text-white">
            <CardHeader>
              <CardTitle>Sessions</CardTitle>
              <CardDescription className="text-gray-400">
                Manage your active sessions and sign out from other devices
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg bg-[#333333] p-3">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-emerald-500" />
                    <div>
                      <p className="font-medium">Current Session</p>
                      <p className="text-xs text-gray-400">Chrome on macOS * New York, USA * Active now</p>
                    </div>
                  </div>
                  <Badge className="bg-emerald-500">Current</Badge>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-[#333333] p-3">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium">Mobile App</p>
                      <p className="text-xs text-gray-400">iOS * New York, USA * Last active 2 hours ago</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-400">
                    Sign Out
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                Sign Out of All Devices
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card className="bg-[#2a2a2a] border-[#333333] text-white">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription className="text-gray-400">
                Control how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Email Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0...5">
                      <p>Portfolio Updates</p>
                      <p className="text-xs text-gray-400">
                        Receive daily or weekly summaries of your portfolio performance
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0...5">
                      <p>AI Predictions</p>
                      <p className="text-xs text-gray-400">Get notified when new AI predictions are available</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0...5">
                      <p>Market News</p>
                      <p className="text-xs text-gray-400">Receive updates on important market events</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0...5">
                      <p>Social Activity</p>
                      <p className="text-xs text-gray-400">Get notified about likes, comments, and new followers</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Push Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0...5">
                      <p>Price Alerts</p>
                      <p className="text-xs text-gray-400">
                        Get notified when stocks in your watchlist hit price targets
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0...5">
                      <p>Trading Activity</p>
                      <p className="text-xs text-gray-400">Receive notifications about your trades and orders</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0...5">
                      <p>Security Alerts</p>
                      <p className="text-xs text-gray-400">Get notified about suspicious account activity</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-[#333333] pt-5">
              <Button variant="outline" className="border-[#444444] text-gray-400">
                Reset to Default
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700">Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="connected" className="mt-6">
          <Card className="bg-[#2a2a2a] border-[#333333] text-white">
            <CardHeader>
              <CardTitle>Connected Accounts</CardTitle>
              <CardDescription className="text-gray-400">
                Manage your connected financial accounts and services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-[#333333] p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="font-bold text-white">B</span>
                    </div>
                    <div>
                      <p className="font-medium">Bank of America</p>
                      <p className="text-xs text-gray-400">Connected on Jan 15, 2023 * 3 accounts</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="border-red-500 text-red-500">
                    Disconnect
                  </Button>
                </div>
              </div>

              <div className="rounded-lg bg-[#333333] p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center">
                      <span className="font-bold text-white">C</span>
                    </div>
                    <div>
                      <p className="font-medium">Chase</p>
                      <p className="text-xs text-gray-400">Connected on Mar 3, 2023 * 2 accounts</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="border-red-500 text-red-500">
                    Disconnect
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border border-dashed border-[#444444] p-4 text-center">
                <p className="mb-2">Connect another financial account</p>
                <Button className="bg-emerald-600 hover:bg-emerald-700">Connect Account</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="bg-[#2a2a2a] border-[#333333] text-white">
        <CardHeader>
          <CardTitle className="text-red-500">Danger Zone</CardTitle>
          <CardDescription className="text-gray-400">Irreversible account actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Delete Account</h3>
              <p className="text-sm text-gray-400">Permanently delete your account and all associated data</p>
            </div>
            <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
              Delete Account
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Sign Out</h3>
              <p className="text-sm text-gray-400">Sign out of your account on this device</p>
            </div>
            <Button
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              onClick={onSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

