
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Award, Gift, Star, Trophy, Heart, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EnhancedRewardsSystemProps {
  user: {
    name: string;
    role: string;
    id: string;
  };
}

const EnhancedRewardsSystem = ({ user }: EnhancedRewardsSystemProps) => {
  const [userPoints, setUserPoints] = useState(1250);
  const [userLevel, setUserLevel] = useState(5);
  const [totalDonations, setTotalDonations] = useState(8);
  const { toast } = useToast();

  const rewards = [
    { id: 1, name: 'Coffee Voucher', points: 100, category: 'food', available: true, icon: '☕' },
    { id: 2, name: 'Movie Ticket', points: 300, category: 'entertainment', available: true, icon: '🎬' },
    { id: 3, name: 'Healthcare Checkup', points: 500, category: 'health', available: true, icon: '🏥' },
    { id: 4, name: 'Smartphone', points: 2000, category: 'electronics', available: false, icon: '📱' },
    { id: 5, name: 'Grocery Voucher', points: 200, category: 'food', available: true, icon: '🛒' },
    { id: 6, name: 'Gym Membership', points: 800, category: 'health', available: true, icon: '💪' }
  ];

  const achievements = [
    { id: 1, name: 'First Timer', description: 'First blood donation', earned: true, icon: '🩸' },
    { id: 2, name: 'Regular Hero', description: '5 donations completed', earned: true, icon: '⭐' },
    { id: 3, name: 'Life Saver', description: '10 donations milestone', earned: false, icon: '🦸' },
    { id: 4, name: 'Community Champion', description: 'Referred 5 donors', earned: true, icon: '👥' },
    { id: 5, name: 'Emergency Responder', description: 'Available during emergency', earned: true, icon: '🚨' }
  ];

  const leaderboard = [
    { rank: 1, name: 'Ram Sharma', points: 3200, donations: 15 },
    { rank: 2, name: 'Sita Poudel', points: 2800, donations: 12 },
    { rank: 3, name: 'Krishna Thapa', points: 2400, donations: 11 },
    { rank: 4, name: user.name, points: userPoints, donations: totalDonations },
    { rank: 5, name: 'Maya Gurung', points: 1100, donations: 6 }
  ];

  const redeemReward = (reward: any) => {
    if (userPoints >= reward.points && reward.available) {
      setUserPoints(prev => prev - reward.points);
      toast({
        title: "Reward Redeemed!",
        description: `${reward.name} has been redeemed for ${reward.points} points`,
      });
    } else {
      toast({
        title: "Insufficient Points",
        description: `You need ${reward.points - userPoints} more points`,
        variant: "destructive",
      });
    }
  };

  const levelProgress = ((userPoints % 500) / 500) * 100;
  const nextLevelPoints = Math.ceil(userPoints / 500) * 500;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* User Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950 dark:to-red-900">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-600 rounded-full">
                <Heart className="h-6 w-6 text-white fill-current" />
              </div>
              <div>
                <p className="text-2xl font-bold text-red-700 dark:text-red-300">{userPoints}</p>
                <p className="text-sm text-red-600 dark:text-red-400">Total Points</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-full">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">Level {userLevel}</p>
                <p className="text-sm text-blue-600 dark:text-blue-400">Current Level</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-600 rounded-full">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">{totalDonations}</p>
                <p className="text-sm text-green-600 dark:text-green-400">Donations</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Level Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-yellow-600" />
            <span>Level Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Level {userLevel}</span>
              <span>{nextLevelPoints - userPoints} points to Level {userLevel + 1}</span>
            </div>
            <Progress value={levelProgress} className="h-3" />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="rewards" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="rewards">Rewards Store</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="rewards" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rewards.map((reward) => (
              <Card key={reward.id} className={`${reward.available ? 'hover:shadow-md' : 'opacity-60'} transition-all duration-200`}>
                <CardContent className="p-4">
                  <div className="text-center space-y-3">
                    <div className="text-4xl">{reward.icon}</div>
                    <h3 className="font-semibold">{reward.name}</h3>
                    <Badge variant={reward.available ? "default" : "secondary"}>
                      {reward.points} points
                    </Badge>
                    <Button 
                      className="w-full" 
                      onClick={() => redeemReward(reward)}
                      disabled={!reward.available || userPoints < reward.points}
                    >
                      {userPoints >= reward.points ? 'Redeem' : 'Need More Points'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className={`${achievement.earned ? 'bg-green-50 dark:bg-green-950' : 'bg-gray-50 dark:bg-gray-800'}`}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{achievement.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{achievement.description}</p>
                    </div>
                    {achievement.earned && (
                      <Badge className="bg-green-600">Earned</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Community Leaderboard</CardTitle>
              <CardDescription>Top donors in your area</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboard.map((entry) => (
                  <div key={entry.rank} className={`flex items-center justify-between p-3 rounded-lg ${entry.name === user.name ? 'bg-blue-50 dark:bg-blue-950' : 'bg-gray-50 dark:bg-gray-800'}`}>
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        entry.rank === 1 ? 'bg-yellow-500 text-white' :
                        entry.rank === 2 ? 'bg-gray-400 text-white' :
                        entry.rank === 3 ? 'bg-orange-500 text-white' :
                        'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300'
                      }`}>
                        {entry.rank}
                      </div>
                      <div>
                        <p className="font-medium">{entry.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{entry.donations} donations</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{entry.points}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">points</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedRewardsSystem;
