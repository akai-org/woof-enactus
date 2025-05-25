import { Center, Container, Flex, Spinner } from "@chakra-ui/react";
import React, { Suspense } from "react";
import type { IBlogPost } from "@/types";
import { BlogFilters, BlogList } from "@/features/blog";

const data: IBlogPost[] = [
  {
    id: 1,
    imageUrl:
      "https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU",
    title: "Spacer po zielonych obrzeżach miasta",
    description:
      "Nowoczesny dom z widokiem nsasasasa sasas  asasasasasdsnfas djkf jaf ndsjifnaa ogród,  sa sasas  asasasasasdsnfas djkf jaf ndsjifnaa ogród, idealny na rodzinne wypady.",
    date: "01.05.2025r.",
    type: "FUN",
  },
  {
    id: 2,
    imageUrl:
      "https://fastly.picsum.photos/id/25/5000/3333.jpg?hmac=yCz9LeSs-i72Ru0YvvpsoECnCTxZjzGde805gWrAHkM",
    title: "Minimalizm i funkcjonalność",
    description:
      "Wnętrze, które łączy prostotę formy z wygodą codziennego życia.",
    date: "02.05.2025r.",
    type: "OTHER",
  },
  {
    id: 3,
    imageUrl:
      "https://fastly.picsum.photos/id/26/4209/2769.jpg?hmac=vcInmowFvPCyKGtV7Vfh7zWcA_Z0kStrPDW3ppP0iGI",
    title: "Miasto, które nigdy nie śpi",
    description: "Spacer nocą po tętniących życiem ulicach centrum.",
    date: "03.05.2025r.",
    type: "FUN",
  },
  {
    id: 4,
    imageUrl:
      "https://fastly.picsum.photos/id/26/4209/2769.jpg?hmac=vcInmowFvPCyKGtV7Vfh7zWcA_Z0kStrPDW3ppP0iGI",
    title: "Kuchnia marzeń",
    description: "Zainspiruj się nowoczesnymi rozwiązaniami w sercu domu.",
    date: "04.05.2025r.",
    type: "OTHER",
  },
  {
    id: 5,
    imageUrl:
      "https://fastly.picsum.photos/id/25/5000/3333.jpg?hmac=yCz9LeSs-i72Ru0YvvpsoECnCTxZjzGde805gWrAHkM",
    title: "Światło i przestrzeń",
    description:
      "Dom zaprojektowany z myślą o maksymalnej ilości naturalnego światła.",
    date: "05.05.2025r.",
    type: "OTHER",
  },
  {
    id: 6,
    imageUrl:
      "https://fastly.picsum.photos/id/28/4928/3264.jpg?hmac=GnYF-RnBUg44PFfU5pcw_Qs0ReOyStdnZ8MtQWJqTfA",
    title: "Oaza spokoju",
    description:
      "Sypialnia, w której odpoczynek staje się prawdziwą przyjemnością.",
    date: "06.05.2025r.",
    type: "HEALTH",
  },
  {
    id: 7,
    imageUrl:
      "https://fastly.picsum.photos/id/25/5000/3333.jpg?hmac=yCz9LeSs-i72Ru0YvvpsoECnCTxZjzGde805gWrAHkM",
    title: "Blisko natury",
    description: "Relaks na świeżym powietrzu w samym sercu miasta.",
    date: "07.05.2025r.",
    type: "FUN",
  },
  {
    id: 8,
    imageUrl:
      "https://fastly.picsum.photos/id/26/4209/2769.jpg?hmac=vcInmowFvPCyKGtV7Vfh7zWcA_Z0kStrPDW3ppP0iGI",
    title: "Luksus w codzienności",
    description: "Nowoczesna łazienka z marmurowym wykończeniem i strefą SPA.",
    date: "08.05.2025r.",
    type: "HEALTH",
  },
  {
    id: 9,
    imageUrl:
      "https://fastly.picsum.photos/id/29/4000/2670.jpg?hmac=rCbRAl24FzrSzwlR5tL-Aqzyu5tX_PA95VJtnUXegGU",
    title: "Ciepło domowego ogniska",
    description: "Salon, w którym każdy wieczór staje się wyjątkowy.",
    date: "09.05.2025r.",
    type: "FUN",
  },
  {
    id: 10,
    imageUrl:
      "https://fastly.picsum.photos/id/19/2500/1667.jpg?hmac=7epGozH4QjToGaBf_xb2HbFTXoV5o8n_cYzB7I4lt6g",
    title: "Widok z wysokości",
    description: "Balkon z panoramicznym widokiem na całe miasto.",
    date: "10.05.2025r.",
    type: "FUN",
  },
  {
    id: 11,
    imageUrl:
      "https://fastly.picsum.photos/id/25/5000/3333.jpg?hmac=yCz9LeSs-i72Ru0YvvpsoECnCTxZjzGde805gWrAHkM",
    title: "Dom jako galeria",
    description: "Sztuka jako integralna część wystroju wnętrz.",
    date: "11.05.2025r.",
    type: "OTHER",
  },
  {
    id: 12,
    imageUrl:
      "https://fastly.picsum.photos/id/19/2500/1667.jpg?hmac=7epGozH4QjToGaBf_xb2HbFTXoV5o8n_cYzB7I4lt6g",
    title: "Przestrzeń do odpoczynku",
    description: "Prywatny ogród z miejscem na książkę i filiżankę kawy.",
    date: "12.05.2025r.",
    type: "HEALTH",
  },
  {
    id: 13,
    imageUrl:
      "https://fastly.picsum.photos/id/19/2500/1667.jpg?hmac=7epGozH4QjToGaBf_xb2HbFTXoV5o8n_cYzB7I4lt6g",
    title: "Gotowanie z widokiem",
    description: "Idealne miejsce do wspólnego przygotowywania posiłków.",
    date: "13.05.2025r.",
    type: "OTHER",
  },
  {
    id: 14,
    imageUrl:
      "https://fastly.picsum.photos/id/21/3008/2008.jpg?hmac=T8DSVNvP-QldCew7WD4jj_S3mWwxZPqdF0CNPksSko4",
    title: "Domowe kino",
    description: "Wieczór filmowy nigdy nie był tak wygodny.",
    date: "14.05.2025r.",
    type: "FUN",
  },
  {
    id: 15,
    imageUrl:
      "https://fastly.picsum.photos/id/21/3008/2008.jpg?hmac=T8DSVNvP-QldCew7WD4jj_S3mWwxZPqdF0CNPksSko4",
    title: "Fasada z charakterem",
    description: "Dom, który przyciąga wzrok już od pierwszego spojrzenia.",
    date: "15.05.2025r.",
    type: "OTHER",
  },
  {
    id: 16,
    imageUrl:
      "https://fastly.picsum.photos/id/21/3008/2008.jpg?hmac=T8DSVNvP-QldCew7WD4jj_S3mWwxZPqdF0CNPksSko4",
    title: "Przestrzeń dla najmłodszych",
    description: "Bezpieczne i inspirujące miejsce do zabawy i nauki.",
    date: "16.05.2025r.",
    type: "OTHER",
  },
  {
    id: 17,

    imageUrl:
      "https://fastly.picsum.photos/id/21/3008/2008.jpg?hmac=T8DSVNvP-QldCew7WD4jj_S3mWwxZPqdF0CNPksSko4",
    title: "Industrialny klimat",
    description: "Styl loftowy z nutą elegancji.",
    date: "17.05.2025r.",
    type: "OTHER",
  },
  {
    id: 18,

    imageUrl:
      "https://fastly.picsum.photos/id/19/2500/1667.jpg?hmac=7epGozH4QjToGaBf_xb2HbFTXoV5o8n_cYzB7I4lt6g",
    title: "Z dala od zgiełku",
    description: "Dom w otoczeniu natury, idealny na weekendowy wypad.",
    date: "18.05.2025r.",
    type: "FUN",
  },
  {
    id: 19,
    imageUrl:
      "https://fastly.picsum.photos/id/28/4928/3264.jpg?hmac=GnYF-RnBUg44PFfU5pcw_Qs0ReOyStdnZ8MtQWJqTfA",
    title: "Miejsce do czytania",
    description: "Wnętrze, które pokochają wszyscy miłośnicy książek.",
    date: "19.05.2025r.",
    type: "FUN",
  },
  {
    id: 20,
    imageUrl:
      "https://fastly.picsum.photos/id/29/4000/2670.jpg?hmac=rCbRAl24FzrSzwlR5tL-Aqzyu5tX_PA95VJtnUXegGU",
    title: "Gra światła",
    description:
      "Nowoczesne oświetlenie, które buduje nastrój każdego wnętrza.",
    date: "20.05.2025r.",
    type: "OTHER",
  },
];

export default async function BlogPage() {
  const blogData = await Promise.resolve(data);

  return (
    <Container marginY="20">
      <Flex justifyContent="flex-end" marginInlineEnd={{ base: "0", sm: "8" }}>
        <BlogFilters />
      </Flex>

      <Suspense
        fallback={
          <Center>
            <Spinner size="lg" />
          </Center>
        }
      >
        <BlogList posts={blogData} />
      </Suspense>
    </Container>
  );
}
