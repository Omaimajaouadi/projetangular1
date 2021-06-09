import { ProductPipe } from './pages/procuct/products/product.pipe';

describe('ProductPipe', () => {
  it('create an instance', () => {
    const pipe = new ProductPipe();
    expect(pipe).toBeTruthy();
  });
});
