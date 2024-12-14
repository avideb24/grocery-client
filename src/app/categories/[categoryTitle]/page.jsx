import DisplayProducts from '@/components/pages/Category/DisplayProducts/DisplayProducts';
import PageTitle from '@/components/shared/PageTitle/PageTitle';
import { getCategoryProducts } from '@/libs/Products/getCategoryProducts';
import { getSubCategoryProducts } from '@/libs/Products/getSubCategoryProducts';
import { getCategoryId } from '@/libs/Sidebar/getCategoryId';
import { getSubCategories } from '@/libs/Sidebar/getSubCategories';
import { getSubCategoryId } from '@/libs/Sidebar/getSubCategoryId';


const SingleCategoryPage = async ({ params, searchParams }) => {
    const { categoryTitle } = params;
    const { subCategory } = searchParams;

    let products = [];
    let subCategories = [];

    const decodedCategory = decodeURIComponent(categoryTitle?.replace(/-/g, ' ').replace(/and/g, '&'));
    const decodedSubCategory = subCategory ? decodeURIComponent(subCategory.replace(/-/g, ' ').replace(/and/g, '&')) : null;

    // get category's id from api
    const categoryId = await getCategoryId(decodedCategory);
    const subCategoryId = await getSubCategoryId(decodedSubCategory);

    // category title for PageTitle
    const capitalizedCategoryTitle = decodedCategory?.charAt(0)?.toUpperCase() + decodedCategory?.slice(1);

    // get subcategories from api
    const allSubCategories = await getSubCategories(categoryId);
    subCategories = allSubCategories?.subCategories;

    // get all category products from api
    const allProducts = await getCategoryProducts(categoryId);
    products = allProducts?.data;

    // get subCategory products from api
    const subCategoryProducts = await getSubCategoryProducts(subCategoryId);
    
    if(!subCategory){
        products = allProducts?.data;
    }
    else{
        products = subCategoryProducts?.data;
    }
    

    return (
        <div>
            <PageTitle title={capitalizedCategoryTitle} />

            {/* subcategory btns */}
            <DisplayProducts categoryTitle={categoryTitle} subCategories={subCategories}  />

        </div>
    );
};

export default SingleCategoryPage;
