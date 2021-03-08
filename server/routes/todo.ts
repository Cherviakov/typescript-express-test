import querystring from 'querystring';
import { Router, Request, Response, } from 'express';
import { TodoService } from '../layers/domain/services';

const router = Router();

router.head('/all', async (req:Request, res:Response) => {
  try {
    const countAll = await TodoService.countAllTodos();
    res.set('X-ITEM-COUNT', countAll.toString());
    res.status(200).end();
  } catch (err) {
    console.error(err);
    res.set('X-ERROR', err.message)
    res.status(500).end();
  }
});

router.head('/', async (req:Request, res:Response) => {
  try {
    const filter = JSON.parse(querystring.unescape(req.get('X-FILTER-QUERY') || '{}'));
    const count = await TodoService.countTodos(filter);
    res.set('X-ITEM-COUNT', count.toString());
    res.status(200).end();
  } catch (err) {
    console.error(err);
    res.set('X-ERROR', err.message);
    res.status(500).end();
  }
});

router.get('/', async (req:Request, res:Response) => {
  try {
    const todos = await TodoService.getTodos();
    res.status(200).send(todos);
  } catch (err) {
    console.error(err);
    res.status(500).send('internal server error');
  }
});

router.post('/', async (req:Request, res:Response) => {
  const todo = req.body;
  try {
    const todoDocument = await TodoService.insertTodo(todo); 
    res.status(200).send(todoDocument);
  } catch (err) {
    console.error(err);
    res.status(500).send('internal server error');
  }
});

router.post('/many', async (req:Request, res:Response) => {
  const todos = req.body;
  try {
    const todoDocuments = await TodoService.insertTodos(todos);
    res.status(200).send(todoDocuments);
  } catch (err) {
    console.error(err);
    res.status(500).send('internal server error');
  }
});

router.put('/', async (req:Request, res:Response) => {
  const todoId = req.get('X-ITEM-ID') || '';
  const updateFields = req.body;
  try {
    const updateResult = await TodoService.updateTodo(todoId, updateFields);
    res.status(200).send(updateResult);
  } catch (err) {
    console.error(err);
    res.status(500).send('internal server error');
  }
});

router.put('/many', async (req:Request, res:Response) => {
  try {
    const todoIds = (req.get('X-ITEM-IDS') || '').split(' ');
    const updateFields = req.body;
    const updateResult = await TodoService.updateTodos(todoIds, updateFields);
    res.status(200).send(updateResult);
  } catch (err) {
    console.error(err);
    res.status(500).send('internal server error');
  }
});

router.delete('/', async (req:Request, res:Response) => {
  const todoId = req.get('X-ITEM-ID') || '';
  try {
    const deleteResult = await TodoService.deleteTodo(todoId);
    res.status(200).send(deleteResult);
  } catch (err) {
    console.error(err);
    res.status(500).send('internal server error');
  }
});

router.delete('/many', async (req:Request, res:Response) => {
  try {
    const todoIds = (req.get('X-ITEM-IDS') || '').split(' ');
    const deleteResult = await TodoService.deleteTodos(todoIds);
    res.status(200).send(deleteResult);
  } catch (err) {
    console.error(err);
    res.status(200).send('internal server error');
  }
});

export default router;
