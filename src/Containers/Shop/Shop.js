import cls  from './Shop.module.css'
import Products from '../../components/products/Products'
import Filter from '../../components/Filter/Filter'
import Pagination from '../../components/Pagination/Pagination'

function Shop(){
    return(
        <div className={cls.shop}>
            <div className={cls.container}>
                <Filter/>
                <Products/>
                <Pagination/>
            </div>
        </div>
    )
}

export default Shop