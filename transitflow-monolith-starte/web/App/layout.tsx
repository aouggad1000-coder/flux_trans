export const metadata = { title: 'TransitFlow' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ fontFamily: 'system-ui, sans-serif', margin: 20 }}>
        <h1>TransitFlow — Dashboard</h1>
        <nav style={{ marginBottom: 16 }}>
          <a href="/">Accueil</a> | <a href="/shipments">Dossiers</a>
        </nav>
        {children}
      </body>
    </html>
  );
}
