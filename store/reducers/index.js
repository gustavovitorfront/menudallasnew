import { combineReducers } from 'redux';
import { home } from './home.reducer';
import { categories } from './categories.reducer';
import { products } from './products.reducer';
import { productDetail } from './productDetail.reducer';
import { sabores } from './sabores.reducer';
import { formasPg } from './formasPg.reducer';
import { login } from './login.reducer';
import { register } from './register.reducer';
import { user } from './user.reducer';
import { bairros } from './bairros.reducer';
import { pedido } from './pedido.reducer';
import { pedidoUser } from './pedidoUser.reducer';
import { avaliacoes } from './avaliacoes.reducer';
import { coupons } from './coupons.reducer';
import { couponsValidar } from './couponsValidar.reducer';
import { banners } from './banners.reducer';
import { lojas } from './lojas.reducer';
import { segmentos } from './segmentos.reducer';

const rootReducer = combineReducers({
  home,
  categories,
  products,
  productDetail,
  sabores,
  formasPg,
  login,
  register,
  user,
  bairros,
  pedido,
  pedidoUser,
  avaliacoes,
  coupons,
  couponsValidar,
  banners,
  lojas,
  segmentos
});

export default rootReducer;