import { tb_incident } from "../model/userProfile.js";

export const registerIncident = async (req, res) => {
    // const { title_incident, description_incident, start_date_incident, end_date_incident, status_incident, fk_id_task, fk_id_type_incident } = req.body
    try {
        const result = await tb_incident.create({
            // title_incident,
            // description_incident,
            // start_date_incident,
            // end_date_incident,
            // status_incident,
            // fk_id_task,
            // fk_id_type_incident
            ...req.body
        })
        result && res.json(result)
    } catch (error) {
        res.json(error)
    }
}

export const listIncidents = async (req, res) => {
    try {
        const incidents = await tb_incident.findAll();
        res.json(incidents);
    } catch (error) {
        res.json(error);
    }
}

export const updateIncident = async (req, res) => {
    const { id } = req.params;
    const { title_incident, description_incident, status_incident } = req.body
    try {
        const incidentToUpdate = await tb_incident.findOne({ where: { pk_id_incident: id } });
        if (!incidentToUpdate) {
            return res.status(404).json({ message: "Incidente no encontrado" });
        }
        incidentToUpdate.title_incident = title_incident;
        incidentToUpdate.description_incident = description_incident;
        incidentToUpdate.status_incident = status_incident;
        await incidentToUpdate.save();
        res.json(incidentToUpdate);
    } catch (error) {
        res.json(error);
    }
}

export const deleteIncident = async (req, res) => {
    const { id } = req.params;
    try {
        const incidentToDelete = await tb_incident.findOne({ where: { pk_id_incident: id } });
        if (!incidentToDelete) {
            return res.status(404).json({ message: "Incidente no encontrado" });
        }
        await incidentToDelete.destroy();
        res.json({ message: "Incidente eliminado correctamente" });
    } catch (error) {
        res.json(error);
    }
}