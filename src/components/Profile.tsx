
import { useState } from "react";
import { User, Mail, Phone, MapPin, Calendar, Camera, Save, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface ProfileProps {
  userType: "admin" | "roaster" | "buyer";
}

const Profile = ({ userType }: ProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: userType === "admin" ? "Admin User" : userType === "roaster" ? "Mountain Peak Roasters" : "Sarah Johnson",
    email: userType === "admin" ? "admin@roasty.com" : userType === "roaster" ? "contact@mountainpeak.com" : "sarah@email.com",
    phone: "+1 (555) 123-4567",
    location: userType === "roaster" ? "Seattle, WA" : "Portland, OR",
    joinDate: "January 2024",
    bio: userType === "admin" ? "System administrator managing the Roasty platform" : 
         userType === "roaster" ? "Premium coffee roaster specializing in single-origin beans from around the world" :
         "Coffee enthusiast and regular buyer of specialty coffees",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  });

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original data if needed
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getAdditionalStats = () => {
    if (userType === "admin") {
      return [
        { label: "Users Managed", value: "1,247" },
        { label: "System Uptime", value: "99.9%" },
        { label: "Support Tickets", value: "156" }
      ];
    } else if (userType === "roaster") {
      return [
        { label: "Products Listed", value: "24" },
        { label: "Total Sales", value: "$45,230" },
        { label: "Rating", value: "4.8★" }
      ];
    } else {
      return [
        { label: "Orders Placed", value: "67" },
        { label: "Total Spent", value: "$1,234" },
        { label: "Reviews Written", value: "23" }
      ];
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-coffee-200">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-coffee-900 flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
              <CardDescription>Manage your account details and preferences</CardDescription>
            </div>
            <Button
              onClick={() => isEditing ? handleCancel() : setIsEditing(true)}
              variant="outline"
              className="border-coffee-300"
            >
              {isEditing ? "Cancel" : <><Edit className="h-4 w-4 mr-2" />Edit</>}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Profile Picture */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <img
                  src={profileData.avatar}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-coffee-200"
                />
                {isEditing && (
                  <Button
                    size="sm"
                    className="absolute bottom-0 right-0 rounded-full coffee-gradient p-2"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <Badge 
                variant="outline" 
                className="border-coffee-300 text-coffee-700 capitalize text-lg px-3 py-1"
              >
                {userType}
              </Badge>
            </div>

            {/* Profile Details */}
            <div className="md:col-span-2 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-coffee-700">Name</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="border-coffee-300"
                    />
                  ) : (
                    <p className="text-coffee-900 font-medium mt-1">{profileData.name}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email" className="text-coffee-700">Email</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="border-coffee-300"
                    />
                  ) : (
                    <p className="text-coffee-900 font-medium mt-1 flex items-center gap-2">
                      <Mail className="h-4 w-4 text-coffee-500" />
                      {profileData.email}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone" className="text-coffee-700">Phone</Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="border-coffee-300"
                    />
                  ) : (
                    <p className="text-coffee-900 font-medium mt-1 flex items-center gap-2">
                      <Phone className="h-4 w-4 text-coffee-500" />
                      {profileData.phone}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="location" className="text-coffee-700">Location</Label>
                  {isEditing ? (
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="border-coffee-300"
                    />
                  ) : (
                    <p className="text-coffee-900 font-medium mt-1 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-coffee-500" />
                      {profileData.location}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="bio" className="text-coffee-700">Bio</Label>
                {isEditing ? (
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    className="border-coffee-300 mt-1"
                    rows={3}
                  />
                ) : (
                  <p className="text-coffee-900 mt-1">{profileData.bio}</p>
                )}
              </div>

              <div className="flex items-center gap-2 text-coffee-600">
                <Calendar className="h-4 w-4" />
                <span>Member since {profileData.joinDate}</span>
              </div>

              {isEditing && (
                <Button onClick={handleSave} className="coffee-gradient">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Card */}
      <Card className="border-coffee-200">
        <CardHeader>
          <CardTitle className="text-coffee-900">Account Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {getAdditionalStats().map((stat, index) => (
              <div key={index} className="text-center p-4 bg-coffee-50 rounded-lg">
                <p className="text-2xl font-bold text-coffee-900">{stat.value}</p>
                <p className="text-coffee-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
