import TodoList from '@/components/TodoList';
import Footer from '@/components/Footer';
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Home() {
  return (
      <main style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <TodoList style={{ flex: 1 }} />
          <Footer />
      </main>
  );
}