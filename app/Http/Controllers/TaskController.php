<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        return Auth::user()->tasks()->latest()->get();
    }

    public function show($id)
    {
        return Auth::user()->tasks()->findOrFail($id);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'description' => 'required',
        ]);
        $task = Auth::user()->tasks()->create($request->all());
        return response()->json($task, 201);
    }

    public function update(Request $request, $id)
    {
        $task = Auth::user()->tasks()->findOrFail($id);
        $task->update($request->all());
        return response()->json($task);
    }
}
