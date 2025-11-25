import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/auth-pages/Login'
import Register from './pages/auth-pages/Register'
import ProtectedRoute from './components/ProtectedRoutes'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home'
import Shop from './pages/Shop'
import HomeLayout from './layout/HomeLayout'
import CategoriesPage from './pages/Categories'
import AboutPage from './pages/About'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/CheckoutPage'
import CreateProfile from './pages/CreateProfile'
import ProfilePage from './pages/ProfilePage'
import CategoryForm from './pages/admin/CategoryForm'
import ProductForm from './pages/admin/ProductForm'
import PaymentSuccess from './pages/SuccessPage'
import PaymentCancel from './pages/CancelPage'
import OrderPage from './pages/Orders'
import AdminShell from './pages/admin/AdminShell'
import OrdersList from './pages/admin/OrderList'
import OrderDetails from './pages/admin/OrderDetails'
import Products from './pages/admin/Products'
import AdminRoute from './components/AdminRoutes'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={
          <ProtectedRoute protect={false}>
            <HomeLayout />
          </ProtectedRoute>
        }>
          <Route index element={<ProtectedRoute protect={false} ><Home /></ProtectedRoute>} />
          <Route path='/shop' element={<ProtectedRoute protect={false} ><Shop /></ProtectedRoute>} />
          <Route path='/categories' element={<ProtectedRoute protect={false} ><CategoriesPage /></ProtectedRoute>} />
          <Route path='/about' element={<ProtectedRoute protect={false} ><AboutPage /></ProtectedRoute>} />
          <Route path='/product-details/:id' element={<ProtectedRoute protect={false} ><ProductDetails /></ProtectedRoute>} />
          <Route path='/cart' element={<ProtectedRoute protect={false} ><Cart /></ProtectedRoute>} />
          <Route path='/checkout/:id' element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path='/create-profile' element={<ProtectedRoute><CreateProfile /></ProtectedRoute>} />
          <Route path='/profile' element={<ProtectedRoute protect={false} ><ProfilePage /></ProtectedRoute>} />
          <Route path='/payment-success' element={<ProtectedRoute><PaymentSuccess /></ProtectedRoute>} />
          <Route path='/payment-failed' element={<ProtectedRoute><PaymentCancel /></ProtectedRoute>} />
          <Route path='/orders' element={<ProtectedRoute><OrderPage /></ProtectedRoute>} />
        </Route>
        <Route path="/admin" element={<AdminRoute><AdminShell /></AdminRoute>}>
            <Route index element={<OrdersList />} />
            <Route path="orders" element={<OrdersList />} />
            <Route path="orders/:id" element={<OrderDetails />} />
            <Route path="products" element={<Products />} />
            <Route path="category-form" element={<CategoryForm />} />
            <Route path="product-form" element={<ProductForm />} />
        </Route>
      </Routes>
    </Router>
    <Toaster />
    </>
  )
}

export default App
