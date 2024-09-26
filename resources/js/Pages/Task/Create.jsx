import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth, projects, users }) {
  const { data, setData, post, errors, reset } = useForm({
    image: "",
    name: "",
    status: "",
    description: "",
    due_date: "",
  });

  console.log(errors);

  const onSubmit = (e) => {
    e.preventDefault(); 

    post(route("task.store"));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Créer une tâche
          </h2>
        </div>
      }
    >
      <Head title="Tasks" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
            >
              <div>
                <InputLabel htmlFor="task_project_id" value="Projet" />

                <SelectInput
                  name="project_id"
                  id="task_project_id"
                  className="mt-1 block w-full"
                  onChange={(e) => setData("project_id", e.target.value)}
                >
                  <option value="">Choisir le projet</option>
                  {projects.data.map((project) => (
                    <option value={project.id} key={project.id}>
                      {project.name}
                      </option>
                  ))}
                </SelectInput>

                <InputError message={errors.project_id} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="task_image_path"
                  value="Image de la tâche"
                />
                <TextInput
                  id="task_image_path"
                  type="file"
                  name="image"
                  className="mt-1 block w-full"
                  onChange={(e) => setData("image", e.target.files[0])}
                />
                <InputError message={errors.image} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="task_name" value="Nom de la tâche" />

                <TextInput
                  id="task_name"
                  type="text"
                  name="name"
                  value={data.name}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={(e) => setData("name", e.target.value)}
                />

                <InputError message={errors.name} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="task_description"
                  value="Description de la tâche"
                />

                <TextAreaInput
                  id="task_description"
                  name="description"
                  value={data.description}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("description", e.target.value)}
                />

                <InputError message={errors.description} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="task_due_date"
                  value="Date limite de la tâche"
                />

                <TextInput
                  id="task_due_date"
                  type="date"
                  name="due_date"
                  value={data.due_date}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("due_date", e.target.value)}
                />

                <InputError message={errors.due_date} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="task_status" value="Statut de la tâche" />

                <SelectInput
                  name="status"
                  id="task_status"
                  className="mt-1 block w-full"
                  onChange={(e) => setData("status", e.target.value)}
                >
                  <option value="">Choisir le statut</option>
                  <option value="en_attente">En attente</option>
                  <option value="en_cours">En cours</option>
                  <option value="terminé">Terminé</option>
                </SelectInput>

                <InputError message={errors.task_status} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="task_priority" value="Priorité de la tâche" />

                <SelectInput
                  name="priority"
                  id="task_priority"
                  className="mt-1 block w-full"
                  onChange={(e) => setData("priority", e.target.value)}
                >
                  <option value="">Choisir la priorité</option>
                  <option value="faible">Faible</option>
                  <option value="moyenne">Moyenne</option>
                  <option value="élevée">Élevée</option>
                </SelectInput>

                <InputError message={errors.priority} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="task_assigned_user" value="Utilisateur assigné" />

                <SelectInput
                  name="assigned_user_id"
                  id="task_assigned_user"
                  className="mt-1 block w-full"
                  onChange={(e) => setData("assigned_user_id", e.target.value)}
                >
                  <option value="">Choisir l'utilisateur</option>
                  {users.data.map((user) => (
                    <option value={user.id} key={user.id}>
                      {user.name}
                      </option>
                  ))}
                </SelectInput>

                <InputError message={errors.assigned_user_id} className="mt-2" />
              </div>
              <div className="mt-4 text-right">
                <Link
                  href={route("task.index")}
                  className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                >
                  Annuler
                </Link>
                <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                  Créer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}