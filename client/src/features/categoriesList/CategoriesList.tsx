import React from 'react';
import { useAppSelector } from '../../store/store';
import { Category } from './categoriesListSlice';
import { Button, Card, Col, Row, Skeleton, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import // useLazyLoadNotesFromCategoryQuery,
// useLoadCategoriesQuery,
'../notesList/notesListApi';
import { useLoadCategoriesQuery } from './categoriesListApi';

function CategoriesList() {
  const navigate = useNavigate();

  const { data: categories } = useLoadCategoriesQuery();
  // const [loadNotesFromCategory] = useLazyLoadNotesFromCategoryQuery();

  const loading = useAppSelector((state) => state.categories.loading);
  const error = useAppSelector((state) => state.categories.error);

  const onHandleClick = async (id: string) => {
    // const data = await loadNotesFromCategory(id);
    // console.log(data);

    navigate(`/category/${id}`);
  };

  return (
    <>
      <Typography.Text>Категории</Typography.Text>
      {error ? (
        <div>{error}</div>
      ) : loading ? (
        <Skeleton />
      ) : (
        <div>
          <Row gutter={16}>
            {categories?.map((category: Category) => {
              return (
                <Col span={8} key={category.id}>
                  <Card
                    title={category.name}
                    onClick={() => onHandleClick(category.id)}
                    className="card-wrapper__card"
                    hoverable
                  ></Card>
                </Col>
              );
            })}
            <Col span={8}>
              <Card
                title={'Заметки без категории'}
                onClick={() => navigate(`/category/no-category`)}
                className="card-wrapper__card"
                hoverable
              ></Card>
            </Col>
          </Row>
        </div>
      )}
      <Button onClick={() => navigate('/notes')}>Ко всем заметкам</Button>
      <Button onClick={() => navigate('/add-category')}>
        Добавить новую категорию
      </Button>
    </>
  );
}

export default CategoriesList;
