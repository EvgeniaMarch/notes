import React, { useCallback } from 'react';
import { useAppSelector } from '../../store/store';
import { Button, Card, Col, Row, Skeleton, Typography } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import // useLazyLoadNotesFromCategoryQuery,
// useLoadCategoriesQuery,
'../notesList/notesListApi';
import { useLoadCategoriesQuery } from './categoriesListApi';
import { Category } from './categoriesListSlice';

type ErrorType = {
  error: string;
};

function CategoriesList() {
  const navigate = useNavigate();

  const { data: categories, error, isLoading } = useLoadCategoriesQuery(); // todo показать тост с ошибкой

  // discuss если функция передается в качестве пропса в какой-либо компонент, то обязательно оборачивать в useCallback
  // const onHandleClick = useCallback(
  //   (id: string) => {
  //     navigate(`/category/${id}`);
  //   },
  //   [navigate],
  // );

  // const onHandleClick = useCallback(
  //   (e) => {

  //   },
  //   [navigate],
  // );

  const handleNavigateToNoCategoty = useCallback(
    () => navigate(`/category/no-category`),
    [navigate],
  );
  const handleNavigateToNotes = useCallback(
    () => navigate('/notes'),
    [navigate],
  );
  const handleNavigateToNewCategory = useCallback(
    () => navigate('/new-category'),
    [navigate],
  );

  return (
    <>
      <Typography.Text>Категории</Typography.Text>

      {/* {error && 'error' in error && <div>{error.error}</div>} */}
      {error &&
        ('data' in error ? (
          // todo погуглить как типизировать ошибку в categoriesListApi
          <div>{(error.data as ErrorType).error}</div>
        ) : (
          <div>Произошла ошибка!</div>
        ))}

      {isLoading ? (
        <Skeleton />
      ) : (
        <div>
          <Row gutter={16}>
            {categories?.map((category) => {
              return (
                // <Col span={8} key={category.id}>
                //   <Card
                //     title={category.name}
                //     // todo починить оптимизацию, сохранить ссылку
                //     onClick={onHandleClick}
                //     className="card-wrapper__card"
                //     hoverable
                //   ></Card>
                // </Col>
                <CategoryView category={category} />
              );
            })}
            <Col span={8}>
              <Card
                title={'Заметки без категории'}
                // todo useCallback
                onClick={handleNavigateToNoCategoty}
                className="card-wrapper__card"
                hoverable
              ></Card>
            </Col>
          </Row>
        </div>
      )}
      <Button onClick={handleNavigateToNotes}>Ко всем заметкам</Button>
      {/* <Link to="/notes">Ко всем заметкам</Link> */}
      <Button onClick={handleNavigateToNewCategory}>
        Добавить новую категорию
      </Button>
    </>
  );
}

export default CategoriesList;

const CategoryView = ({ category }: { category: Category }) => {
  const navigate = useNavigate();

  const onHandleClick = useCallback(() => {
    navigate(`/category/${category.id}`);
  }, [category.id, navigate]);

  return (
    <Col span={8} key={category.id}>
      <Card
        title={category.name}
        // todo починить оптимизацию, сохранить ссылку
        onClick={onHandleClick}
        className="card-wrapper__card"
        hoverable
      ></Card>
    </Col>
  );
};
