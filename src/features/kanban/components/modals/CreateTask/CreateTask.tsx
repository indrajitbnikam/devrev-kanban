import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import Modal from '../../../../../shared/components/Modal';
import { TaskCardData, TaskType } from '../../../types/Task';
import { selectLanes, createTask } from '../../../slices/kanbanSlice';
import { generateNewUniqueId } from '../../../../../shared/utils/uuid';
import Button from '../../../../../shared/components/Button';
import Dropdown from '../../../../../shared/components/Dropdown';
import { KeyboardEvent, useCallback, useMemo } from 'react';
import { DropdownOption } from '../../../../../shared/components/Dropdown/Dropdown';

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
  taskName: z.string().min(1, { message: 'Task name is required!' }),
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
    setError,
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

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key === 'Enter') {
      event.preventDefault();
    }
  }, []);

  const onSubmit = () => {
    const formData = getValues();
    const validationResult = validationSchema.safeParse(formData);
    if (validationResult.success) {
      const newTask: TaskCardData = {
        id: generateNewUniqueId(),
        name: formData.taskName,
        type: formData.type,
      };
      dispatch(
        createTask({
          laneId: formData.laneId,
          taskData: newTask,
        }),
      );
      onClose();
    } else {
      // Need to set it manually due to some weird reason that won't update error object automatically on validation
      setError('taskName', { message: 'Task name is required!' }, { shouldFocus: true });
    }
  };

  return (
    <Modal title="Create new task" onClose={onClose}>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="taskName" className="block mb-2 text-base font-medium">
            Name
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-base rounded-lg  block w-full p-2.5 "
            id="taskName"
            type="text"
            placeholder="Next epic To-Do"
            {...register('taskName')}
            onKeyDown={handleKeyDown}
          />
          {Boolean(errors.taskName) && <p className="mt-2 text-sm text-[#E02020]">{errors.taskName?.message}</p>}
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
          <label htmlFor="laneId" className="block mb-2 text-base font-medium">
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
