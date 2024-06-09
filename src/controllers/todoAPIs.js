const { updateSchema, createTodoSchema } = require("../Schema/TodoSchema");
const pool = require("../database/config/connection");

//* insert data

const insertTodo = async (req, res, next) => {
  const { user_id } = req;
  const insertQuery = `INSERT INTO todos ( todoValue, user_id ) VALUES ($1 ,$2)`;
  const { todoValue } = req.body;

  try {
    const result = await pool.query(insertQuery, [todoValue, user_id]);
    res.status(201).json({
      message: "successfully inserted",
    });
  } catch (error) {
    next(error);
  }
};

//* get all data

const getAllTodo = async (req, res, next) => {
  const { user_id } = req;
  let { isCompleted } = req.query;
  if (!isCompleted) {
    isCompleted = null;
  }
  const SQL = `SELECT id,
                      todoValue as todo,
                      isCompleted 
               FROM todos 
               WHERE user_id=$1 
                  AND (iscompleted::boolean=$2 OR $2 IS NULL)
                  AND archieved_at IS NULL
`;
  try {
    const result = await pool.query(SQL, [user_id, isCompleted]);
    res.status(200).json({
      todos: result.rows,
    });
  } catch (error) {
    next(error);
  }
};

//* update data

const updateTodo = async (req, res, next) => {
  const { user_id } = req;
  const { id, todoValue, isCompleted } = req.body;
  // updateSchema.validate({ id, todoValue, isCompleted });
  const updateQuery = `UPDATE todos SET todoValue=$2 , isCompleted=$3 , updated_at=CURRENT_TIMESTAMP WHERE id=$1 AND user_id=$4`;
  try {
    const result = await pool.query(updateQuery, [
      id,
      todoValue,
      isCompleted,
      user_id,
    ]);
    res.status(200).json({
      message: "updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

//* delete data

const deleteTodo = (req, res, next) => {
  const { id } = req.query;
  const { user_id } = req;

  const SQL = `UPDATE todos SET archieved_at=CURRENT_TIMESTAMP WHERE id = $1 AND user_id=$2`; //* pass current time stamp for current date

  try {
    const result = pool.query(SQL, [id, user_id]);
    res.status(202).json({
      message: "Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { insertTodo, getAllTodo, updateTodo, deleteTodo };
