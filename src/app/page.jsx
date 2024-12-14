import Stories from '@/components/pages/Home/Stories/Stories';
import PageTitle from '@/components/shared/PageTitle/PageTitle';
import OfferBanner from '@/components/pages/Home/OfferBanner/OfferBanner';
import { getHomePageProducts } from '@/libs/Products/getHomePageProducts';
import CategoryProducts from '@/components/shared/CategoryProducts/CategoryProducts';



const HomePage = async () => {

    const mainCategoryId = 'e8ceddc1-2734-4ddf-b3aa-e8bbc47adcb6';

    const allCategoryData = await getHomePageProducts(mainCategoryId)

    // console.log(allCategoryData);


    return (
        <div>

            <PageTitle title={'Home'} />

            {/* stories */}
            <Stories />

            {/* offer banner */}
            <OfferBanner />

            {/* homepage products */}
            <div>

                {
                    allCategoryData?.map(categoryData => {
                        return categoryData?.subCategories?.map(subCategoryData =>
                            <CategoryProducts key={subCategoryData?.id} categoryTitle={categoryData?.title} subCategoryTitle={subCategoryData?.title} products={subCategoryData?.products} relatedProducts={false} />
                        )
                    }
                    )
                }


            </div>

        </div>
    );
};

export default HomePage;
