"use client";

import { useEffect, useRef, useState } from "react";
import { BlogContainer } from "@/components";
import Filters from "@/components/blog/Filters";
import { Center, Container, Spinner, Button } from "@chakra-ui/react";
import type { BlogType } from "@/types";

interface BlogPost {
  imageUrl: string;
  imageAlt: string;
  title: string;
  description: string;
  date: string;
  type: BlogType;
}

export default function Blog() {
  const [count, setCount] = useState(6); // Początkowo 6 postów
  const [showObserver, setShowObserver] = useState(false); // Czy observer ma działać?
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const data: BlogPost[] = [
    {
      imageUrl:
        "https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU",
      imageAlt: "Modern house with pool",
      title: "Spacer po zielonych obrzeżach miasta",
      description:
        "Nowoczesny dom z widokiem nsasasasa sasas  asasasasasdsnfas djkf jaf ndsjifnaa ogród,  sa sasas  asasasasasdsnfas djkf jaf ndsjifnaa ogród, idealny na rodzinne wypady.",
      date: "01.05.2025r.",
      type: "FUN",
    },
    {
      imageUrl:
        "https://fastly.picsum.photos/id/25/5000/3333.jpg?hmac=yCz9LeSs-i72Ru0YvvpsoECnCTxZjzGde805gWrAHkM",
      imageAlt: "Minimalistyczny salon",
      title: "Minimalizm i funkcjonalność",
      description:
        "Wnętrze, które łączy prostotę formy z wygodą codziennego życia.",
      date: "02.05.2025r.",
      type: "OTHER",
    },
    {
      imageUrl:
        "https://fastly.picsum.photos/id/26/4209/2769.jpg?hmac=vcInmowFvPCyKGtV7Vfh7zWcA_Z0kStrPDW3ppP0iGI",
      imageAlt: "Panorama miasta nocą",
      title: "Miasto, które nigdy nie śpi",
      description: "Spacer nocą po tętniących życiem ulicach centrum.",
      date: "03.05.2025r.",
      type: "FUN",
    },
    {
      imageUrl:
        "https://fastly.picsum.photos/id/26/4209/2769.jpg?hmac=vcInmowFvPCyKGtV7Vfh7zWcA_Z0kStrPDW3ppP0iGI",
      imageAlt: "Nowoczesna kuchnia",
      title: "Kuchnia marzeń",
      description: "Zainspiruj się nowoczesnymi rozwiązaniami w sercu domu.",
      date: "04.05.2025r.",
      type: "OTHER",
    },
    {
      imageUrl:
        "https://fastly.picsum.photos/id/25/5000/3333.jpg?hmac=yCz9LeSs-i72Ru0YvvpsoECnCTxZjzGde805gWrAHkM",
      imageAlt: "Dom z dużymi oknami",
      title: "Światło i przestrzeń",
      description:
        "Dom zaprojektowany z myślą o maksymalnej ilości naturalnego światła.",
      date: "05.05.2025r.",
      type: "OTHER",
    },
    {
      imageUrl:
        "https://fastly.picsum.photos/id/28/4928/3264.jpg?hmac=GnYF-RnBUg44PFfU5pcw_Qs0ReOyStdnZ8MtQWJqTfA",
      imageAlt: "Nowoczesna sypialnia",
      title: "Oaza spokoju",
      description:
        "Sypialnia, w której odpoczynek staje się prawdziwą przyjemnością.",
      date: "06.05.2025r.",
      type: "HEALTH",
    },
    {
      imageUrl:
        "https://fastly.picsum.photos/id/25/5000/3333.jpg?hmac=yCz9LeSs-i72Ru0YvvpsoECnCTxZjzGde805gWrAHkM",
      imageAlt: "Zielony taras",
      title: "Blisko natury",
      description: "Relaks na świeżym powietrzu w samym sercu miasta.",
      date: "07.05.2025r.",
      type: "FUN",
    },
    {
      imageUrl:
        "https://fastly.picsum.photos/id/26/4209/2769.jpg?hmac=vcInmowFvPCyKGtV7Vfh7zWcA_Z0kStrPDW3ppP0iGI",
      imageAlt: "Elegancka łazienka",
      title: "Luksus w codzienności",
      description:
        "Nowoczesna łazienka z marmurowym wykończeniem i strefą SPA.",
      date: "08.05.2025r.",
      type: "HEALTH",
    },
    {
      imageUrl:
        "https://fastly.picsum.photos/id/29/4000/2670.jpg?hmac=rCbRAl24FzrSzwlR5tL-Aqzyu5tX_PA95VJtnUXegGU",
      imageAlt: "Pokój dzienny z kominkiem",
      title: "Ciepło domowego ogniska",
      description: "Salon, w którym każdy wieczór staje się wyjątkowy.",
      date: "09.05.2025r.",
      type: "FUN",
    },
    {
      imageUrl:
        "https://fastly.picsum.photos/id/19/2500/1667.jpg?hmac=7epGozH4QjToGaBf_xb2HbFTXoV5o8n_cYzB7I4lt6g",
      imageAlt: "Nowoczesny balkon",
      title: "Widok z wysokości",
      description: "Balkon z panoramicznym widokiem na całe miasto.",
      date: "10.05.2025r.",
      type: "FUN",
    },
    {
      imageUrl:
        "https://fastly.picsum.photos/id/25/5000/3333.jpg?hmac=yCz9LeSs-i72Ru0YvvpsoECnCTxZjzGde805gWrAHkM",
      imageAlt: "Korytarz ze sztuką",
      title: "Dom jako galeria",
      description: "Sztuka jako integralna część wystroju wnętrz.",
      date: "11.05.2025r.",
      type: "OTHER",
    },
    {
      imageUrl:
        "https://fastly.picsum.photos/id/19/2500/1667.jpg?hmac=7epGozH4QjToGaBf_xb2HbFTXoV5o8n_cYzB7I4lt6g",
      imageAlt: "Kuchnia z wyspą",
      title: "Przestrzeń do odpoczynku",
      description: "Prywatny ogród z miejscem na książkę i filiżankę kawy.",
      date: "12.05.2025r.",
      type: "HEALTH",
    },
    {
      imageUrl:
        "https://fastly.picsum.photos/id/19/2500/1667.jpg?hmac=7epGozH4QjToGaBf_xb2HbFTXoV5o8n_cYzB7I4lt6g",
      imageAlt: "Kuchnia z wyspą",
      title: "Gotowanie z widokiem",
      description: "Idealne miejsce do wspólnego przygotowywania posiłków.",
      date: "13.05.2025r.",
      type: "OTHER",
    },
    {
      imageUrl:
        "https://fastly.picsum.photos/id/21/3008/2008.jpg?hmac=T8DSVNvP-QldCew7WD4jj_S3mWwxZPqdF0CNPksSko4",
      imageAlt: "Salon z projektorem",
      title: "Domowe kino",
      description: "Wieczór filmowy nigdy nie był tak wygodny.",
      date: "14.05.2025r.",
      type: "FUN",
    },
    {
      imageUrl:
        "https://fastly.picsum.photos/id/21/3008/2008.jpg?hmac=T8DSVNvP-QldCew7WD4jj_S3mWwxZPqdF0CNPksSko4",
      imageAlt: "Nowoczesna elewacja",
      title: "Fasada z charakterem",
      description: "Dom, który przyciąga wzrok już od pierwszego spojrzenia.",
      date: "15.05.2025r.",
      type: "OTHER",
    },
    {
      imageUrl:
        "https://fastly.picsum.photos/id/21/3008/2008.jpg?hmac=T8DSVNvP-QldCew7WD4jj_S3mWwxZPqdF0CNPksSko4",
      imageAlt: "Pokój dziecięcy",
      title: "Przestrzeń dla najmłodszych",
      description: "Bezpieczne i inspirujące miejsce do zabawy i nauki.",
      date: "16.05.2025r.",
      type: "OTHER",
    },
    {
      imageUrl:
        "https://fastly.picsum.photos/id/21/3008/2008.jpg?hmac=T8DSVNvP-QldCew7WD4jj_S3mWwxZPqdF0CNPksSko4",
      imageAlt: "Wnętrze loftowe",
      title: "Industrialny klimat",
      description: "Styl loftowy z nutą elegancji.",
      date: "17.05.2025r.",
      type: "OTHER",
    },
    {
      imageUrl:
        "https://fastly.picsum.photos/id/19/2500/1667.jpg?hmac=7epGozH4QjToGaBf_xb2HbFTXoV5o8n_cYzB7I4lt6g",
      imageAlt: "Dom w górach",
      title: "Z dala od zgiełku",
      description: "Dom w otoczeniu natury, idealny na weekendowy wypad.",
      date: "18.05.2025r.",
      type: "FUN",
    },
    {
      imageUrl:
        "https://fastly.picsum.photos/id/28/4928/3264.jpg?hmac=GnYF-RnBUg44PFfU5pcw_Qs0ReOyStdnZ8MtQWJqTfA",
      imageAlt: "Stylowa biblioteka",
      title: "Miejsce do czytania",
      description: "Wnętrze, które pokochają wszyscy miłośnicy książek.",
      date: "19.05.2025r.",
      type: "FUN",
    },
    {
      imageUrl:
        "https://fastly.picsum.photos/id/29/4000/2670.jpg?hmac=rCbRAl24FzrSzwlR5tL-Aqzyu5tX_PA95VJtnUXegGU",
      imageAlt: "Oświetlenie wnętrza",
      title: "Gra światła",
      description:
        "Nowoczesne oświetlenie, które buduje nastrój każdego wnętrza.",
      date: "20.05.2025r.",
      type: "OTHER",
    },
  ];

  // IntersectionObserver
  useEffect(() => {
    if (!showObserver) return;

    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setCount(prev => Math.min(prev + 5, data.length)); // Ładuj kolejne 5
        }
      },
      {
        rootMargin: "200px",
        threshold: 0.1,
      },
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [showObserver]);

  return (
    <>
      <Center padding="30px">
        <Filters />
      </Center>

      <Container display="flex" flexWrap="wrap" justifyContent="center">
        {data.slice(0, count).map((item, index) => (
          <BlogContainer key={index} {...item} />
        ))}
      </Container>

      {!showObserver && count < data.length && (
        <Center padding="50px">
          <Button
            padding="30px"
            fontSize="large"
            backgroundColor="accent.green"
            onClick={() => setShowObserver(true)}
          >
            Pokaż więcej
          </Button>
        </Center>
      )}

      {showObserver && count < data.length && (
        <Center ref={loaderRef} padding="30px">
          <Spinner size="lg" />
        </Center>
      )}
    </>
  );
}
