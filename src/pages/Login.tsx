
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Coffee, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulasi proses login
    setTimeout(() => {
      setIsLoading(false);
      console.log("Login attempt:", { username, password });
      
      // Cek login admin
      if (username === "admin" && password === "admin") {
        console.log("Admin login successful");
        navigate("/admin");
      } else {
        console.log("Regular user login");
        // Di sini akan ada logika autentikasi sebenarnya untuk user biasa
      }
    }, 1000);
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
          <p className="text-coffee-600">Masuk ke akun Anda</p>
        </div>

        <Card className="border-coffee-200 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-coffee-900">Masuk</CardTitle>
            <CardDescription className="text-coffee-600">
              Masukkan username dan password untuk mengakses akun Anda
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-coffee-700">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Masukkan username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="border-coffee-200 focus:ring-coffee-500 focus:border-coffee-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-coffee-700">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-coffee-200 focus:ring-coffee-500 focus:border-coffee-500 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-coffee-500 hover:text-coffee-700"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    id="remember"
                    type="checkbox"
                    className="rounded border-coffee-200 text-coffee-600 focus:ring-coffee-500"
                  />
                  <Label htmlFor="remember" className="text-sm text-coffee-600">
                    Ingat saya
                  </Label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm text-coffee-600 hover:text-coffee-800 hover:underline"
                >
                  Lupa password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full coffee-gradient hover:opacity-90 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Memproses..." : "Masuk"}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-coffee-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-coffee-500">Atau</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button variant="outline" className="border-coffee-200 text-coffee-600 hover:bg-coffee-50">
                  Roaster
                </Button>
                <Button variant="outline" className="border-coffee-200 text-coffee-600 hover:bg-coffee-50">
                  Buyer
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-coffee-600">
                Belum punya akun?{" "}
                <Link
                  to="/register"
                  className="text-coffee-700 hover:text-coffee-900 font-medium hover:underline"
                >
                  Daftar sekarang
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

export default Login;
