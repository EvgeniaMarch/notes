import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { Category, loadCategories } from './categoriesListSlice';
import { Button, Card, Col, Row, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

function CategoriesList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const categories = useAppSelector((state) => state.categories.categoriesList);
  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);
  console.log('categories', categories);

  return (
    <>
      <Typography.Text>Категории</Typography.Text>
      <div>
        <Row gutter={16}>
          {categories?.map((category: Category) => {
            return (
              <Col span={8} key={category.id}>
                <Card
                  title={category.name}
                  onClick={() => navigate(`/category/${category.id}`)}
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
      <Button onClick={() => navigate('/notes')}>Ко всем заметкам</Button>
      <Button onClick={() => navigate('/add-category')}>
        Добавить новую категорию
      </Button>
    </>
  );
}

export default CategoriesList;
