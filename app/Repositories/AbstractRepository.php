<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;

abstract class AbstractRepository
{

    /**
     * @throws \Exception
     */
    public function create(array $data): Model
    {
        $model = new($this->getModelClass());

        return $this->update($model, $data);
    }

    /**
     * @throws \Exception
     */
    public function update(Model $model, array $data): Model
    {
        $model->fill($data);

        if (!$model->save()) {
            throw new \Exception("Failed to update model");
        }

        return $model;
    }

    public function find(int $id): ?Model
    {
        $modelClass = $this->getModelClass();

        return $modelClass::query()->find($id);
    }

    /**
     * @throws \Exception
     */
    public function delete(int $id): bool
    {
        $model = $this->find($id);

        if (!$model) {
            throw new \Exception("Failed to delete model. Model with id $model->id not found");
        }

        return $model->delete();
    }

    abstract protected function getModelClass(): string;
}
