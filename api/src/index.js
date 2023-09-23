"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
var serviceAccount = require("../servicesAccountKey.json");
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount)
});
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/tasks', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const snapshot = yield firebase_admin_1.default.firestore().collection('tasks').get();
        const tasks = snapshot.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
        res.status(200).json(tasks);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las tareas' });
    }
}));
app.post('/tasks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskData = req.body;
        taskData.isDone = false;
        const docRef = yield firebase_admin_1.default.firestore().collection('tasks').add(taskData);
        res.status(201).json({ id: docRef.id });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al agregar la tarea' });
    }
}));
app.get('/tasks/:taskId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.taskId;
        const docRef = yield firebase_admin_1.default.firestore().collection('tasks').doc(taskId).get();
        if (!docRef.exists) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        const taskData = docRef.data();
        return res.json(taskData);
    }
    catch (error) {
        console.error('Error al buscar la tarea:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}));
app.put('/tasks/:taskId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.taskId;
        const updatedTaskData = req.body;
        yield firebase_admin_1.default.firestore().collection('tasks').doc(taskId).update(updatedTaskData);
        res.status(200).json({ message: 'Tarea actualizada con éxito' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la tarea' });
    }
}));
app.delete('/tasks/:taskId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskId } = req.params;
        yield firebase_admin_1.default.firestore().collection('tasks').doc(taskId).delete();
        res.status(204).end();
    }
    catch (error) {
        console.error('Error al eliminar la tarea:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}));
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
