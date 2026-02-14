import type { Metadata } from "next";
import { Inter, Arimo } from "next/font/google";
import "./globals.css";
import Header from "@/Components/Layout/Header/page";
import { Analytics } from "@vercel/analytics/next"
import { FormProvider } from "./FormContext";


const interVar = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
})

const arimoVar = Arimo({
  subsets: ["latin"],
  variable: "--font-arimo"
})


export const metadata: Metadata = {
  title: {
    default: "Wayme.az - AI ilə İdeal Karyeranızı Kəşf Edin",
    template: "%s | Wayme.az",
  },
  description:
    "Wayme.az - Süni intellekt əsaslı karyera seçim platforması. Sadə suallara cavab verərək sizə ən uyğun peşəni, iş sahəsini və karyera yolunu kəşf edin. Gələcəyinizi formalaşdırın!",
  keywords: [
    "wayme",
    "wayme.az",
    "karyera",
    "iş seçimi",
    "peşə seçimi",
    "AI",
    "süni intellekt",
    "karyera testi",
    "iş tapmaq",
    "peşə yönləndirmə",
    "Azərbaycan",
    "career",
    "job matching",
    "AI career advisor",
    "career test",
    "job finder",
  ],
  authors: [{ name: "Wayme.az Team" }],
  creator: "Wayme.az",
  publisher: "Wayme.az",
  metadataBase: new URL("https://wayme.az"),
  alternates: {
    canonical: "/",
    languages: {
      "az-AZ": "/az",
      "en-US": "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "az_AZ",
    url: "https://wayme.az",
    siteName: "Wayme.az",
    title: "Wayme.az - AI ilə İdeal Karyeranızı Kəşf Edin",
    description:
      "Süni intellekt əsaslı karyera seçim platforması. Sadə suallara cavab verərək sizə ən uyğun peşəni və karyera yolunu kəşf edin.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Wayme.az - AI Karyera Məsləhətçisi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wayme.az - AI ilə İdeal Karyeranızı Kəşf Edin",
    description:
      "Süni intellekt əsaslı karyera seçim platforması. Sadə suallara cavab verərək sizə ən uyğun peşəni və karyera yolunu kəşf edin.",
    images: ["/og-image.png"],
    creator: "@waymeaz",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interVar.variable} ${arimoVar.variable} bg-[#091E3E] antialiased`}
      >
        <Analytics />
        <FormProvider>
          <Header />
          {children}
        </FormProvider>
      </body>
    </html>
  );
}

