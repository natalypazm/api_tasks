import express, { Application } from 'express';
import cors from 'cors';
import admin from 'firebase-admin';
import * as functions from 'firebase-functions';

var serviceAccount = require("../servicesAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app: Application = express();
const port = 3000;
app.use(cors());
app.use(express.json());


app.get('/tasks', async (_req, res) => {
  try {
    const snapshot = await admin.firestore().collection('tasks').get();
    const tasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las tareas' });
  }
});

app.post('/tasks/create', async (req, res) => {
  try {
    const taskData = req.body;
    taskData.isDone = false;
    const docRef = await admin.firestore().collection('tasks').add(taskData);
    res.status(201).json({ id: docRef.id});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agregar la tarea' });
  }
});

app.get('/tasks/:taskId', async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const docRef = await admin.firestore().collection('tasks').doc(taskId).get();
    if (!docRef.exists) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    const taskData = docRef.data();
    return res.json(taskData);
  } catch (error) {
    console.error('Error al buscar la tarea:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});


app.put('/tasks/:taskId', async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const updatedTaskData = req.body;
    await admin.firestore().collection('tasks').doc(taskId).update(updatedTaskData);
    res.status(200).json({ message: 'Tarea actualizada con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la tarea' });
  }
});


app.delete('/tasks/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    await admin.firestore().collection('tasks').doc(taskId).delete();
    res.status(204).end();
  } catch (error) {
    console.error('Error al eliminar la tarea:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

exports.app = functions.https.onRequest(app)