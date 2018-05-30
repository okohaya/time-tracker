<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Timer extends Model
{
    protected $fillable = ['user_id', 'task_id', 'started_at', 'stopped_at', 'comment'];
    protected $dates = ['created_at', 'updated_at', 'started_at', 'stopped_at'];

    protected $casts = [
        'user_id' => 'integer',
        'task_id' => 'integer',
    ];

    protected function serializeDate(\DateTimeInterface $date)
    {
        return gmdate('Y-m-d\TH:i:s\Z', $date->getTimestamp());
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function task()
    {
        return $this->belongsTo(Task::class);
    }
}