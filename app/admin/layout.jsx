
export default function layout({ children }) {
  return   <div className="min-h-screen bg-gray-100">
  <main className="pt-2 overflow-x-hidden overflow-y-auto bg-gray-200 min-h-screen">
    <div className="container mx-auto px-6 py-8">
      {children}
    </div>
  </main>
</div>
}