import uuid from 'react-uuid';

export const schemaUser = [
    {
        name: 'first_name_user',
        type: 'text',

    },
    {
        name: 'last_name_user',
        type: 'text',
        
    },
    {
        name: 'email_user',
        type: 'email',
        
    },
    {
        name: 'first_name_user',
        type: 'text',
        
    },
    {
        name: 'password_user',
        type: 'password',
        
    }
]

export const schemaTask = [
    {
        name: 'title_task',
        type: 'text',
    },
    {
        name: 'description_task',
        type: 'text'
        
    },
    {
        name: 'status_task',
        selections: [
            'open',
            'closed',
            'in progres'
        ]
    },
    {
        name: 'start_date_task',
        type: 'date',
    },
    {
        name: 'end_date_task',
        type: 'date',
    },
    {
        name: 'priority_task',
        selections: [
            'first',
            'second',
            'third'
        ]
    },
    {
        name: 'development_HH',
        type: 'number',
    },
    {
        name: 'reward_task',
        type: 'number',
    },
    {
        name: 'limit_incidents',
        type: 'number',
    }
]

export const schemaIncident = [
    {
        name: 'title_incident',
        type: 'text'
    },
    {
        name: 'description_incident',
        type: 'text'
    },
    {
        name: 'start_date_incident',
        type: 'date'
    },
    {
        name: 'end_date_incident',
        type: 'date'
    },
    {
        name: 'status_incident',
        selections: [
            'open',
            'closed',
            'in progres'
        ]
    }
]
 
export const schemaForm = (obj, handle) => {
    return (
        <>
        {obj.map((field)=>{

            if (!field?.selections) {
                return (
                <input name={field.name} onChange={e=>handle(e)} type={field.type} key={uuid()} />
                )
            }

            else {
            return (
                <label name={field.name} onChange={e=>handle(e)} key={uuid()} >
                {field.selections.map(e=>(
                    <div key={uuid()} >
                        <h4>Eleccion {e}</h4>
                        <input name={field.name} value={e} type="radio" />
                    </div>
                ))}
                </label>
            )
            }

        })}
        </>
    )
}