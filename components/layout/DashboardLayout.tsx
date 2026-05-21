import Sidebar from './Sidebar'
import Header from './Header'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
      <Sidebar />
      <Header />
      <main
        className="min-h-screen"
        style={{
          marginLeft: 'var(--sidebar-w)',
          paddingTop: 'var(--header-h)',
        }}
      >
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}
