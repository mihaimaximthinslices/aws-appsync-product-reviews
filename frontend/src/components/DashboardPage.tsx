import { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { signOut } from 'aws-amplify/auth';
import { getAllProducts } from '../graphql/queries';
import { Product } from '../API';

export function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const client = generateClient();
    (async () => {
      const dbProducts = await client.graphql({
        query: getAllProducts,
      });
      setProducts(dbProducts.data.getAllProducts);
    })();
  }, []);

  return (
    <div className="p-4 w-screen flex flex-col items-center ">
      <p>Welcome to the dashboard</p>
      <button
        onClick={async () => {
          await signOut();
          window.location.reload();
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 max-w-screen-sm rounded focus:outline-none focus:shadow-outline"
      >
        Sign out
      </button>
      <p className="text-left w-full mt-4">Products:</p>
      {products.map((product) => (
        <div key={product.id} className="flex flex-col gap-2 w-full">
          <div className="flex gap-2 justify-start w-full">
            <span>{product.title}</span>
            <span>{product.description}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
