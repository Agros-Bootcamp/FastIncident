import { tb_type_incident } from "../model/userProfile.js";

export const registerTypeIncident = async (req, res) => {
    const { title_type_incident, description_type_incident, penalty_incident, returned_tokens } = req.body
    try {
        const result = await tb_type_incident.create({
            title_type_incident,
            description_type_incident,
            penalty_incident,
            returned_tokens
        })
        result && res.json(result)
    } catch (error) {
        res.json(error)
    }
}

export const listTypeIncident = async (req, res) => {
    try {
        const typeIncidents = await tb_type_incident.findAll();
        res.json(typeIncidents);
    } catch (error) {
        res.json(error);
    }
}

export const updateTypeIncident = async (req, res) => {
    const { id } = req.params;
    const { title_type_incident, description_type_incident, penalty_incident, returned_tokens } = req.body;

    try {
        const typeIncidentToUpdate = await tb_type_incident.findOne({ where: { pk_id_type_incident: id } });
        if (!typeIncidentToUpdate) {
            return res.status(404).json({ message: "Tipo de Incidencia no encontrada" });
        }
        typeIncidentToUpdate.title_type_incident = title_type_incident;
        typeIncidentToUpdate.description_type_incident = description_type_incident;
        typeIncidentToUpdate.penalty_incident = penalty_incident;
        typeIncidentToUpdate.returned_tokens = returned_tokens;
        await typeIncidentToUpdate.save();
        res.json(typeIncidentToUpdate);
    } catch (error) {
        res.json(error)
    }
}

export const deleteTypeIncident = async (req, res) => {
    const { id } = req.params;
    try {
        const typeIncidentToDelete = await tb_type_incident.findOne({ where: { pk_id_type_incident: id } });
        if (!typeIncidentToDelete) {
            return res.status(404).json({ message: "Tipo de Incidencia no encontrada" });
        }
        await typeIncidentToDelete.destroy();
        res.json({ message: "Tipo de Incidencia eliminada correctamente" });
    } catch (error) {
        res.json(error);
    }
}