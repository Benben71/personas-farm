import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  projectData: {
    title: string;
    contact: {
      email: string;
      phone: string;
      address: string;
      website: string;
    };
  };
}

export default function Layout({ children, projectData }: LayoutProps) {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
      <Header projectData={projectData} />
      {children}
      {/* Footer deactivated as requested */}
      {/* <Footer projectData={projectData} /> */}
    </div>
  );
}

