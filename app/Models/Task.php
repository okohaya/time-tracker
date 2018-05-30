<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = ['user_id', 'description'];
    protected $casts = ['user_id' => 'integer'];

    protected function serializeDate(\DateTimeInterface $date)
    {
        return gmdate('Y-m-d\TH:i:s\Z', $date->getTimestamp());
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function time_entries()
    {
        return $this->hasMany(TimeEntry::class);
    }
}
