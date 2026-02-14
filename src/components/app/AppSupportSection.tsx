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

          <div className="flex flex-row gap-2">
            <a href="https://wa.me/55SEUNUMERO" target="_blank" rel="noreferrer">
              <Button variant="secondary" size="sm" className="text-xs px-4 py-2">
                <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                WhatsApp
              </Button>
            </a>
            <a href="mailto:suporte@seusite.com">
              <Button variant="ghost" size="sm" className="text-xs px-4 py-2">
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />
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