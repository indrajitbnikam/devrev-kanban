import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '../../../redux/hooks';
import Modal from '../Modal';
import { TaskLaneData } from '../../../types/Task';
import { selectLanes, createLane } from '../../../pages/Kanban/kanbanSlice';
import { generateNewUniqueId } from '../../../utils/uuid';
import Button from '../../Button/Button';

type Props = {
  onClose: () => void;
};

const validationSchema = z.object({
  name: z.string().min(1, { message: 'Lane name is required!' }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

function CreateLane({ onClose }: Props) {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = () => {
    const formData = getValues();
    if (validationSchema.safeParse(formData).success) {
      const newTaskLane: TaskLaneData = {
        id: generateNewUniqueId(),
        name: formData.name,
        cards: [],
      };
      dispatch(createLane(newTaskLane));
      onClose();
    }
  };

  return (
    <Modal title="Create new lane" onClose={onClose}>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="block mb-2 text-sm font-medium">
            Name
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="name"
            type="text"
            placeholder="What's next?"
            {...register('name')}
          />
          {Boolean(errors.name) && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.name?.message}</p>
          )}
        </div>
        <Button name="Create" onClick={handleSubmit(onSubmit)} />
      </form>
    </Modal>
  );
}

export default CreateLane;
