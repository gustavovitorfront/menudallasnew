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
  avaliacoes
});

export default rootReducer;