
import { useState } from "react";
import { Link } from "react-router-dom";
import { Coffee, Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulasi proses register
    setTimeout(() => {
      setIsLoading(false);
      console.log("Register attempt:", formData);
      // Di sini akan ada logika registrasi sebenarnya
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRoleSelect = (role: string) => {
    setFormData({
      ...formData,
      role
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-coffee-50 to-coffee-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo dan Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Coffee className="h-10 w-10 text-coffee-600" />
            <span className="text-3xl font-bold coffee-text-gradient">
              Roasty
            </span>
          </div>
          <p className="text-coffee-600">Buat akun baru Anda</p>
        </div>

        <Card className="border-coffee-200 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-coffee-900">Daftar</CardTitle>
            <CardDescription className="text-coffee-600">
              Lengkapi informasi di bawah untuk membuat akun baru
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-coffee-700">Nama Lengkap</Label>
                <div className="relative">
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="border-coffee-200 focus:ring-coffee-500 focus:border-coffee-500 pl-10"
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-coffee-500" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-coffee-700">Email</Label>
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="nama@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="border-coffee-200 focus:ring-coffee-500 focus:border-coffee-500 pl-10"
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-coffee-500" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-coffee-700">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="border-coffee-200 focus:ring-coffee-500 focus:border-coffee-500 pl-10 pr-10"
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-coffee-500" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-coffee-500 hover:text-coffee-700"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-coffee-700">Konfirmasi Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Konfirmasi password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="border-coffee-200 focus:ring-coffee-500 focus:border-coffee-500 pl-10 pr-10"
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-coffee-500" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-coffee-500 hover:text-coffee-700"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-coffee-700">Pilih Peran</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant={formData.role === "roaster" ? "default" : "outline"}
                    className={`border-coffee-200 text-coffee-600 hover:bg-coffee-50 ${
                      formData.role === "roaster" ? "coffee-gradient text-white" : ""
                    }`}
                    onClick={() => handleRoleSelect("roaster")}
                  >
                    Roaster
                  </Button>
                  <Button
                    type="button"
                    variant={formData.role === "buyer" ? "default" : "outline"}
                    className={`border-coffee-200 text-coffee-600 hover:bg-coffee-50 ${
                      formData.role === "buyer" ? "coffee-gradient text-white" : ""
                    }`}
                    onClick={() => handleRoleSelect("buyer")}
                  >
                    Buyer
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="rounded border-coffee-200 text-coffee-600 focus:ring-coffee-500"
                />
                <Label htmlFor="terms" className="text-sm text-coffee-600">
                  Saya setuju dengan{" "}
                  <Link to="/terms" className="text-coffee-700 hover:text-coffee-900 hover:underline">
                    Syarat & Ketentuan
                  </Link>
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full coffee-gradient hover:opacity-90 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Memproses..." : "Daftar"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-coffee-600">
                Sudah punya akun?{" "}
                <Link
                  to="/login"
                  className="text-coffee-700 hover:text-coffee-900 font-medium hover:underline"
                >
                  Masuk sekarang
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="text-coffee-600 hover:text-coffee-800 text-sm hover:underline"
          >
            ← Kembali ke beranda
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
