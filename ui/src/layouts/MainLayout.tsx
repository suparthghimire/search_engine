import { createEmotionCache, MantineProvider, Global } from "@mantine/core";
// import font from assets folder

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const emotionCache = createEmotionCache({
    key: "mantine",
  });
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      emotionCache={emotionCache}
      theme={{
        primaryShade: 0,
        fontFamily: "DM Sans, sans-serif",
        /** Put your mantine theme override here */
        colorScheme: "light",
        colors: {
          navyBlue: [
            "#000D35",
            "#192549",
            "#323d5d",
            "#4c5571",
            "#666d85",
            "#7f869a",
            "#999eae",
            "#b2b6c2",
            "#ccced6",
            "#e5e6ea",
          ],
        },
        primaryColor: "navyBlue",
      }}
    >
      {children}
    </MantineProvider>
  );
}
