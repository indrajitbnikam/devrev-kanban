import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '../../../../../redux/hooks';
import Modal from '../../../../../shared/components/Modal';
import { TaskLaneData } from '../../../types/Task';
import { createLane } from '../../../slices/kanbanSlice';
import { generateNewUniqueId } from '../../../../../shared/utils/uuid';
import Button from '../../../../../shared/components/Button/Button';

type Props = {
  onClose: () => void;
};

const validationSchema = z.object({
  laneName: z.string().min(1, { message: 'Lane name is required!' }),
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
        name: formData.laneName,
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
          <label htmlFor="laneName" className="block mb-2 text-base font-medium">
            Name
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-base rounded-lg  block w-full p-2.5 "
            id="laneName"
            type="text"
            placeholder="What's next?"
            {...register('laneName')}
          />
          {Boolean(errors.laneName) && <p className="mt-2 text-sm text-[#E02020]">{errors.laneName?.message}</p>}
        </div>
        <Button name="Create" onClick={handleSubmit(onSubmit)} />
      </form>
    </Modal>
  );
}

export default CreateLane;
