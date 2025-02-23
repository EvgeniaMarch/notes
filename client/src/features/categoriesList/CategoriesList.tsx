import React, { useCallback } from 'react';
import { Button, Card, Col, Row, Skeleton, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import // useLazyLoadNotesFromCategoryQuery,
// useLoadCategoriesQuery,
'../notesList/notesListApi';
import {
  useDeleteCategoryMutation,
  useLoadCategoriesQuery,
} from './categoriesListApi';
import { Category } from './categoriesListSlice';
import { DeleteOutlined } from '@ant-design/icons';

type ErrorType = {
  error: string;
};

function CategoriesList() {
  const navigate = useNavigate();

  const { data: categories, error, isLoading } = useLoadCategoriesQuery(); // todo показать тост с ошибкой

  const handleNavigateToNoCategoty = useCallback(
    () => navigate(`/categories/no-category`),
    [navigate],
  );
  const handleNavigateToNotes = useCallback(
    () => navigate('/notes'),
    [navigate],
  );
  const handleNavigateToNewCategory = useCallback(
    () => navigate('/categories/new'),
    [navigate],
  );

  return (
    <>
      <Typography.Text>Категории</Typography.Text>

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
              return <CategoryView category={category} />;
            })}
            <Col span={8}>
              <Card
                title={'Заметки без категории'}
                onClick={handleNavigateToNoCategoty}
                className="card-wrapper__card"
                hoverable
              ></Card>
            </Col>
          </Row>
        </div>
      )}
      <Button onClick={handleNavigateToNotes}>Ко всем заметкам</Button>
      <Button onClick={handleNavigateToNewCategory}>
        Добавить новую категорию
      </Button>
    </>
  );
}

export default CategoriesList;

const CategoryView = ({ category }: { category: Category }) => {
  const navigate = useNavigate();
  const [deleteCategory] = useDeleteCategoryMutation();
  const onHandleDelete = (
    id: string,
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    deleteCategory(id);
  };

  const onHandleClick = useCallback(() => {
    navigate(`/categories/${category.id}`);
  }, [category.id, navigate]);

  return (
    <Col span={8} key={category.id}>
      <Card
        title={category.name}
        onClick={onHandleClick}
        className="card-wrapper__card"
        hoverable
        extra={
          <DeleteOutlined
            onClick={(e) => {
              onHandleDelete(category.id, e);
            }}
          />
        }
      ></Card>
    </Col>
  );
};
