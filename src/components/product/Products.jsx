import { useGetProductsQuery } from '../../redux/api/productsApi'
import { Button, Card } from 'antd';
import { Container } from '../../utils';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const Products = () => {
    const {data} = useGetProductsQuery();
  return (
    <div className='my-10'>
       <Container>
        <div className='grid grid-cols-4 gap-4'>
        {
              data && data.payload &&
              data.payload.map(product => 
                <Card
                hoverable
                style={{
                  width: 260,
                }}
                cover={
                  <Link to={`/products/${product._id}`}>
                    <img alt="example" src={product.product_images[0]} />
                  </Link>
                }
              >
                <Meta title={product.product_name} />
                <br />
                <strong>${product.sale_price}</strong>
                <br />
                <Button className='w-full mt-4' type='primary'>Add to cart</Button>
              </Card>
              )
          }
        </div>
       </Container>
    </div>
  )
}

export default Products