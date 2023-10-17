import { useState } from 'react';
import Head from 'next/head';
import { Header } from '@/components/Header';
import styles from './styles.module.scss';
import { FiRefreshCcw } from 'react-icons/fi';
import { setupApiClient } from '@/services/api';
import { canSSRAuth } from '../../utils/canSSRAuth';
import { ModalOrder } from '../../components/ModalOrder';
import Modal from 'react-modal';
import pdfMake from 'pdfmake/build/pdfmake'; // Importe a biblioteca pdfmake
import pdfFonts from 'pdfmake/build/vfs_fonts'; // Importe os fonts

// Configure os fonts
pdfMake.vfs = pdfFonts.pdfMake.vfs;

// Defina o tipo de dados para as ordens
type OrderProps = {
  id: string;
  table: string | number;
  status: boolean;
  draft: boolean;
  name: string | null;
};

interface HomeProps {
  orders: OrderProps[];
}

export type OrderItemProps = {
  id: string;
  amount: number;
  order_id: string;
  product_id: string;
  product: {
    id: string;
    name: string;
    description: string;
    price: string;
    banner: string;
  };
  order: {
    id: string;
    table: string | number;
    status: boolean;
    name: string | null;
  };
};

export default function Dashboard({ orders }: HomeProps) {
  const [orderList, setOrderList] = useState(orders || []);

  const [modalItem, setModalItem] = useState<OrderItemProps[]>();
  const [modalVisible, setModalVisible] = useState(false);

  function hadleCloseModal() {
    setModalVisible(false);
  }

  async function handleOpenModalView(id: string) {
    const apiClient = setupApiClient();

    const response = await apiClient.get('/order/detail', {
      params: {
        order_id: id,
      },
    });

    setModalItem(response.data);
    setModalVisible(true);
  }

  // FUNÇÃO PARA CRIAR PDP
  //async function createPDF(id: string, response: any) {
  //const docDefinition = {
  // content: [`Operação concluída para o ID: ${id}`, `Resposta: ${JSON.stringify(response)}`],
  //};

  // Gere o PDF usando pdfmake
  // pdfMake.createPdf(docDefinition).download('output.pdf');
  //}

  async function handleFinishItem(id: string) {
    const apiClient = setupApiClient();

    try {
      const response = await apiClient.get('/order/detail', {
        params: {
          order_id: id,
        },
      });

      /* 
  // Exibir informações do item
  const data = response.data && response.data[0];

  if (data) {
    console.log('amount:', data.amount); // Quantidade do item
    console.log('product.name:', data.product?.name); // Nome do produto
    console.log('product.price:', data.product?.price); // Preço do produto
    console.log('order.table:', data.order?.table); // Número da mesa
    console.log('order.name_client:', data.order?.name_client); // Nome do cliente
  } else {
    console.log('Nenhum item encontrado com o ID fornecido ou a resposta está vazia.');
  }
  */

      await apiClient.put('/order/finish', { order_id: id });

      const resListOrders = await apiClient.get('/orders');
      setOrderList(resListOrders.data);

      setModalVisible(false);
    } catch (error) {
      console.error('Ocorreu um erro na solicitação:', error);
    }
  }

  async function handleRefreshOrders() {
    const apiClient = setupApiClient();

    const response = await apiClient.get('/orders');
    setOrderList(response.data);
  }

  Modal.setAppElement('#__next');

  return (
    <>
      <Head>
        <title>Painel - dashboard</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1>Últimos pedidos</h1>
            <button onClick={handleRefreshOrders}>
              <FiRefreshCcw size={25} color="#3fffa3" />
            </button>
          </div>
          <article className={styles.listOrders}>
            {orderList.length === 0 && (
              <span className={styles.emptyList}>Nunhum pedido em aberto foi encontado...</span>
            )}

            {orderList.map(item => (
              <section key={item.id} className={styles.orderItem}>
                <button onClick={() => handleOpenModalView(item.id)}>
                  <div className={styles.tag}></div>
                  <span>Mesa {item.table}</span>
                </button>
              </section>
            ))}
          </article>
        </main>

        {modalVisible && (
          <ModalOrder
            isOpen={modalVisible}
            onRequestClose={hadleCloseModal}
            order={modalItem}
            handleFinishOrder={handleFinishItem}
          ></ModalOrder>
        )}
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async ctx => {
  const apiClient = setupApiClient(ctx);

  const response = await apiClient.get('/orders');
  //console.log(response.data);

  return {
    props: {
      orders: response.data,
    },
  };
});
