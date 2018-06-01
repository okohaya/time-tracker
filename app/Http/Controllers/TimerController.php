<?php

namespace App\Http\Controllers;

use App\Models\Timer;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TimerController extends Controller
{
    public function index()
    {
        return Auth::user()->timers()->with('task:id,description')->latest('id')->get();
    }

    public function store(Timer $timer, Request $request)
    {
        $attributes = [
            'user_id' => Auth::id(),
            'task_id' => $request->input('task_id'),
            'started_at' => Carbon::now(),
            'stopped_at' => null,
            'comment' => $request->input('comment', ''),
        ];
        $timer->fill($attributes)->save();
        return response()->json($timer->fresh('task:id,description'));
    }

    public function update(Request $request, $id)
    {
        $time = null;
        if ($request->has('stopped_at')) {
            $time = new Carbon($request->input('stopped_at'));
        }
        $timer = Auth::user()->timers()->with('task:id,description')->findOrFail($id);
        $timer->update([
            'stopped_at' => $time,
        ]);
        return response()->json($timer);
    }
}
