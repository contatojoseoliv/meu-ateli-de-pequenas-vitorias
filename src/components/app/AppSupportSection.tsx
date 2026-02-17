import { Mail, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/shared/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppProfile } from "@/hooks/useAppProfile";

export function AppSupportSection() {
  const { profile } = useAppProfile();

  return <section className="space-y-3" aria-labelledby="app-support-title">
      

      <Card className="app-stitch">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Olá {profile.displayName}👋. Como podemos ajudar?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Fale com a gente pelo canal que for mais confortável.
          </p>

          <div className="flex flex-col sm:flex-row gap-2">
            <a href="https://wa.me/55SEUNUMERO" target="_blank" rel="noreferrer" className="sm:flex-1">
              <Button variant="secondary" size="default" className="w-full">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp
              </Button>
            </a>
            <a href="mailto:suporte@seusite.com" className="sm:flex-1">
              <Button variant="ghost" size="default" className="w-full">
                <Mail className="h-4 w-4" aria-hidden="true" />
                E-mail
              </Button>
            </a>
          </div>

          <div className="pt-1">
            <Link to="/app/suporte" className="text-sm font-medium text-primary hover:underline">
              Abrir página de suporte
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>;
}