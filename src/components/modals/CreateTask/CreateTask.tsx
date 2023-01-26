import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import Modal from '../Modal';
import { TaskCardData, TaskType } from '../../../types/Task';
import { selectLanes, createTask } from '../../../pages/Kanban/kanbanSlice';
import { generateNewUniqueId } from '../../../utils/uuid';
import Button from '../../Button/Button';
import Dropdown from '../../Dropdown';
import { useMemo } from 'react';
import { DropdownOption } from '../../Dropdown/Dropdown';

type Props = {
  onClose: () => void;
};

const typeOptions: DropdownOption[] = [
  {
    id: 'FEATURE',
    name: 'FEATURE',
  },
  {
    id: 'BUG',
    name: 'BUG',
  },
  {
    id: 'REQUEST',
    name: 'REQUEST',
  },
];

const validationSchema = z.object({
  name: z.string().min(1, { message: 'Task name is required!' }),
  type: z.enum(['REQUEST', 'BUG', 'FEATURE']),
  laneId: z.string().uuid(),
});

type ValidationSchema = z.infer<typeof validationSchema>;

function CreateTask({ onClose }: Props) {
  const dispatch = useAppDispatch();
  const lanes = useAppSelector(selectLanes);

  const {
    register,
    getValues,
    control,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const laneOptions = useMemo(
    () =>
      lanes.map<DropdownOption>((lane) => ({
        id: lane.id,
        name: lane.name,
      })),
    [lanes],
  );

  const onSubmit = () => {
    const formData = getValues();
    if (validationSchema.safeParse(formData).success) {
      const newTask: TaskCardData = {
        id: generateNewUniqueId(),
        name: formData.name,
        type: formData.type,
      };
      dispatch(
        createTask({
          laneId: formData.laneId,
          taskData: newTask,
        }),
      );
      onClose();
    }
  };

  return (
    <Modal title="Create new task" onClose={onClose}>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="block mb-2 text-base font-medium">
            Name
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="name"
            type="text"
            placeholder="Next epic To-Do"
            {...register('name')}
          />
          {Boolean(errors.name) && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.name?.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="type" className="block mb-2 text-base font-medium">
            Type
          </label>
          <Controller
            control={control}
            name="type"
            defaultValue={typeOptions[0].id as TaskType}
            render={({ field }) => <Dropdown options={typeOptions} onChange={field.onChange} />}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="lane" className="block mb-2 text-base font-medium">
            Lane
          </label>
          <Controller
            control={control}
            name="laneId"
            defaultValue={laneOptions[0].id}
            render={({ field }) => <Dropdown options={laneOptions} onChange={field.onChange} />}
          />
        </div>

        <Button name="Create" onClick={onSubmit} />
      </form>
    </Modal>
  );
}

export default CreateTask;
