 
 "use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Github } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex   h-screen ">
      <section className="mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <Card className="border-primary/20  from-primary/5 to-primary/10 overflow-hidden relative">
            <div className="absolute inset-0 bg-grid-white/5 " />
            <CardContent className="text-center py-12 space-y-6 relative">
              <h2 className="text-3xl font-bold text-foreground">
                Siap untuk Memulai?
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Daftar sekarang dan mulai menggunakan BankScoreAI untuk prediksi
                kelayakan kredit yang akurat
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/dashboard">
                  <Button size="lg" className="gap-2">
                    <LineChart className="size-5" />
                    Mulai Sekarang
                  </Button>
                </Link>
                <Link href="https://github.com/Capstone-Asah-Team-A25-CS091" target="_blank">
                  <Button size="lg" className="gap-2 bg-transparent cursor-pointer">
                    <Github className="size-5" />
                    View on GitHub
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}
