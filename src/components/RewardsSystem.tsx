
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Gift, Star, Trophy, Award, Crown, Heart, Zap, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RewardsSystemProps {
  user: {
    name: string;
    id: string;
    role: string;
  };
}

const RewardsSystem = ({ user }: RewardsSystemProps) => {
  const [userPoints, setUserPoints] = useState(450);
  const [userLevel, setUserLevel] = useState(3);
  const [achievements, setAchievements] = useState([
    { id: 1, title: 'First Donation', description: 'Completed your first blood donation', earned: true, icon: Heart, points: 100 },
    { id: 2, title: 'Life Saver', description: 'Helped save 5 lives', earned: true, icon: Shield, points: 250 },
    { id: 3, title: 'Regular Hero', description: 'Donated blood 10 times', earned: false, icon: Trophy, points: 500 },
    { id: 4, title: 'Emergency Responder', description: 'Responded to 3 emergency requests', earned: true, icon: Zap, points: 200 },
    { id: 5, title: 'Community Champion', description: 'Donated blood 25 times', earned: false, icon: Crown, points: 1000 }
  ]);

  const [rewards, setRewards] = useState([
    { id: 1, title: 'Coffee Voucher', description: 'Free coffee at local cafes', cost: 100, available: true, image: '☕' },
    { id: 2, title: 'Movie Ticket', description: 'Free movie ticket', cost: 200, available: true, image: '🎬' },
    { id: 3, title: 'Health Checkup', description: 'Free basic health checkup', cost: 300, available: true, image: '🏥' },
    { id: 4, title: 'Restaurant Meal', description: 'Free meal at partner restaurants', cost: 400, available: true, image: '🍽️' },
    { id: 5, title: 'Medical Insurance', description: '10% discount on medical insurance', cost: 500, available: true, image: '🛡️' }
  ]);

  const { toast } = useToast();

  const handleRedeemReward = (reward: any) => {
    if (userPoints >= reward.cost) {
      setUserPoints(prev => prev - reward.cost);
      toast({
        title: "Reward Redeemed!",
        description: `You've successfully redeemed ${reward.title}`,
      });
    } else {
      toast({
        title: "Insufficient Points",
        description: `You need ${reward.cost - userPoints} more points to redeem this reward`,
        variant: "destructive",
      });
    }
  };

  const nextLevelPoints = (userLevel + 1) * 200;
  const progressToNext = ((userPoints % 200) / 200) * 100;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Points Summary */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="h-6 w-6 text-yellow-600" />
            <span>Your Rewards</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">{userPoints}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Total Points</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">Level {userLevel}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Current Level</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{achievements.filter(a => a.earned).length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Achievements</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-300">Progress to Level {userLevel + 1}</span>
              <span className="text-sm font-medium">{Math.round(progressToNext)}%</span>
            </div>
            <Progress value={progressToNext} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-orange-600" />
            <span>Achievements</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <div key={achievement.id} className={`p-4 rounded-lg border ${achievement.earned ? 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800' : 'bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700'}`}>
                  <div className="flex items-start space-x-3">
                    <Icon className={`h-6 w-6 ${achievement.earned ? 'text-green-600' : 'text-gray-400'}`} />
                    <div className="flex-1">
                      <h4 className={`font-medium ${achievement.earned ? 'text-green-800 dark:text-green-200' : 'text-gray-600 dark:text-gray-400'}`}>
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{achievement.description}</p>
                      <div className="mt-2">
                        <Badge variant={achievement.earned ? 'default' : 'secondary'}>
                          {achievement.points} points
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Rewards Catalog */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Gift className="h-5 w-5 text-purple-600" />
            <span>Redeem Rewards</span>
          </CardTitle>
          <CardDescription>
            Use your points to get amazing rewards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rewards.map((reward) => (
              <div key={reward.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="text-center mb-3">
                  <div className="text-4xl mb-2">{reward.image}</div>
                  <h4 className="font-medium">{reward.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{reward.description}</p>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{reward.cost} points</Badge>
                  <Button 
                    size="sm" 
                    onClick={() => handleRedeemReward(reward)}
                    disabled={userPoints < reward.cost}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Redeem
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RewardsSystem;
